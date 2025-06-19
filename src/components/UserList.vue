<template>
  <div class="user-list">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
        width="4"
      />
      <p class="text-h6 mt-4 text-medium-emphasis">Cargando usuarios...</p>
    </div>

    <!-- Error State -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      closable
      class="mb-6"
      @click:close="error = ''"
    >
      <template #prepend>
        <v-icon>mdi-alert-circle</v-icon>
      </template>
      <strong>Error al cargar usuarios:</strong> {{ error }}
      <template #append>
        <v-btn
          color="error"
          variant="text"
          size="small"
          @click="loadUsers"
        >
          Reintentar
        </v-btn>
      </template>
    </v-alert>

    <!-- Empty State -->
    <div v-else-if="filteredUsers.length === 0 && !loading" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1">mdi-account-search</v-icon>
      <h3 class="text-h5 mt-4 mb-2">No se encontraron usuarios</h3>
      <p class="text-body-1 text-medium-emphasis">
        {{ searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay usuarios disponibles' }}
      </p>
    </div>

    <!-- Users Grid -->
    <v-row v-else>
      <v-col
        v-for="user in filteredUsers"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <UserCard
          :user="user"
          @view-details="openUserModal"
          class="h-100"
        />
      </v-col>
    </v-row>

    <!-- User Modal -->
    <UserModal
      v-model="modalOpen"
      :user="selectedUser"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import userService, { type User } from '../services/userService';
import UserCard from './UserCard.vue';
import UserModal from './UserModal.vue';

interface Props {
  searchQuery?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: ''
});

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref('');
const modalOpen = ref(false);
const selectedUser = ref<User | null>(null);

const filteredUsers = computed(() => {
  if (!props.searchQuery) {
    return users.value;
  }
  
  const query = props.searchQuery.toLowerCase().trim();
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
});

const loadUsers = async () => {
  try {
    loading.value = true;
    error.value = '';
    users.value = await userService.getUsers();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error loading users:', err);
  } finally {
    loading.value = false;
  }
};

const openUserModal = (user: User) => {
  selectedUser.value = user;
  modalOpen.value = true;
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.user-list {
  width: 100%;
}

.h-100 {
  height: 100%;
}

/* Custom loading animation */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.v-progress-circular {
  animation: pulse 2s infinite;
}
</style>