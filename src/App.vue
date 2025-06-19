<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      elevation="4"
    >
      <v-app-bar-title class="d-flex align-center">
        <v-icon class="mr-2" size="28">mdi-account-group</v-icon>
        <span class="text-h5 font-weight-bold">Gestión de Usuarios</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" fluid>
        <!-- Header Section -->
        <v-row class="mb-6">
          <v-col cols="12">
            <div class="text-center mb-6">
              <h1 class="text-h3 font-weight-bold mb-2">Directorio de Usuarios</h1>
              <p class="text-h6 text-medium-emphasis">
                Explora y conoce más sobre nuestros usuarios
              </p>
            </div>
            
            <!-- Search Bar -->
            <SearchBar
              @search="handleSearch"
              class="mb-4"
            />
          </v-col>
        </v-row>

        <!-- User List -->
        <UserList :search-query="searchQuery" />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      color="grey-lighten-4"
      class="text-center"
    >
      <v-row>
        <v-col cols="12">
          <p class="text-body-2 text-medium-emphasis mb-0">
            Desarrollado con ❤️ usando Vue 3 + Vuetify 3
            <br>
            <small>Datos proporcionados por JSONPlaceholder API - &copy;2025 Rodrigo Bonilla. Todos los derechos reservados.</small>
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import UserList from './components/UserList.vue';

const searchQuery = ref('');

const handleSearch = (query: string) => {
  searchQuery.value = query;
};
</script>

<style>
/* Global styles */
.v-application {
  font-family: 'Roboto', sans-serif;
}

.v-main {
  min-height: calc(100vh - 64px - 48px); /* Adjust for app bar and footer */
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Card hover effects */
.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08) !important;
}
</style>