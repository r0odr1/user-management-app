<template>
  <v-dialog
    v-model="isOpen"
    max-width="600px"
    persistent
    transition="dialog-transition"
  >
    <v-card class="user-modal">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-avatar size="50" class="mr-3">
            <v-img
              :src="avatarUrl"
              :alt="`Avatar de ${user?.name}`"
              cover
            />
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold">{{ user?.name }}</h2>
            <p class="text-body-2 text-medium-emphasis mb-0">@{{ user?.username }}</p>
          </div>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="closeModal"
        />
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="6">
            <div class="info-section">
              <h3 class="text-h6 mb-3 d-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-email</v-icon>
                Contacto
              </h3>
              <div class="info-item">
                <strong>Email:</strong>
                <a :href="`mailto:${user?.email}`" class="text-primary">
                  {{ user?.email }}
                </a>
              </div>
              <div class="info-item">
                <strong>Teléfono:</strong>
                <a :href="`tel:${user?.phone}`" class="text-primary">
                  {{ user?.phone }}
                </a>
              </div>
              <div class="info-item" v-if="user?.website">
                <strong>Sitio web:</strong>
                <a 
                  :href="websiteUrl" 
                  target="_blank" 
                  class="text-primary"
                  rel="noopener noreferrer"
                >
                  {{ user?.website }}
                  <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
                </a>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="info-section">
              <h3 class="text-h6 mb-3 d-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-map-marker</v-icon>
                Dirección
              </h3>
              <div class="address-card">
                <p class="mb-1">{{ user?.address.street }}, {{ user?.address.suite }}</p>
                <p class="mb-1">{{ user?.address.city }}</p>
                <p class="mb-0 text-medium-emphasis">{{ user?.address.zipcode }}</p>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="info-section">
              <h3 class="text-h6 mb-3 d-flex align-center">
                <v-icon class="mr-2" color="primary">mdi-office-building</v-icon>
                Compañía
              </h3>
              <v-card variant="tonal" class="pa-4">
                <h4 class="text-h6 font-weight-bold mb-2">{{ user?.company.name }}</h4>
                <p class="text-body-1 mb-2 font-italic">"{{ user?.company.catchPhrase }}"</p>
                <p class="text-body-2 text-medium-emphasis mb-0">{{ user?.company.bs }}</p>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          color="primary"
          variant="elevated"
          @click="closeModal"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { User } from '../services/userService';
import userService from '../services/userService';

interface Props {
  user: User | null;
  modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const avatarUrl = computed(() => {
  return props.user ? userService.generateAvatarUrl(props.user.id) : '';
});

const websiteUrl = computed(() => {
  if (!props.user?.website) return '';
  return props.user.website.startsWith('http') 
    ? props.user.website 
    : `https://${props.user.website}`;
});

const closeModal = () => {
  isOpen.value = false;
};

// Close modal when clicking outside or pressing ESC
watch(isOpen, (newValue) => {
  if (!newValue) {
    emit('update:modelValue', false);
  }
});
</script>

<style scoped>
.user-modal {
  max-height: 90vh;
  overflow-y: auto;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-item {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item strong {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
}

.address-card {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 1rem;
}

.dialog-transition-enter-active,
.dialog-transition-leave-active {
  transition: all 0.3s ease;
}

.dialog-transition-enter-from,
.dialog-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>