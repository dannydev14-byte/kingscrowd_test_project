<template>
  <button
    @click="$emit('export')"
    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { EXPORT_CSV_BUTTON } from "../constants";

interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: EXPORT_CSV_BUTTON,
});

defineEmits<{
  export: [];
}>();
</script>
