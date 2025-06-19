<template>
  <v-text-field
    v-model="searchQuery"
    label="Buscar usuarios por nombre"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    clearable
    dense
    class="search-bar"
    @input="onSearchInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');

const emit = defineEmits<{
  search: [query: string];
}>();

const onSearchInput = () => {
  emit('search', searchQuery.value);
};

// Watch for changes to emit search events
watch(searchQuery, (newValue) => {
  emit('search', newValue || '');
});
</script>

<style scoped>
.search-bar {
  max-width: 400px;
  margin: 0 auto;
}
</style>