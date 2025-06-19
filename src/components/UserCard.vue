<template>
  <v-card
    class="user-card"
    elevation="3"
    hover
    @click="$emit('view-details', user)"
  >
    <v-card-text class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-avatar
          size="60"
          class="mr-4"
        >
          <v-img
            :src="avatarUrl"
            :alt="`Avatar de ${user.name}`"
            cover
          />
        </v-avatar>
        <div class="user-info">
          <h3 class="text-h6 font-weight-bold mb-1">{{ user.name }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ user.email }}</p>
        </div>
      </div>
      
      <v-btn
        color="primary"
        variant="elevated"
        block
        @click.stop="$emit('view-details', user)"
      >
        <v-icon left>mdi-eye</v-icon>
        Ver más
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { User } from '../services/userService';
import userService from '../services/userService';

interface Props {
  user: User;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'view-details': [user: User];
}>();

const avatarUrl = computed(() => {
  return userService.generateAvatarUrl(props.user.id);
});
</script>

<style scoped>
.user-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  height: 100%;
}

.user-card:hover {
  transform: translateY(-2px);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-info h3 {
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.2;
}

.user-info p {
  color: rgba(0, 0, 0, 0.6);
  word-break: break-word;
}
</style>