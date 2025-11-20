<template>
  <div
    v-if="totalPages > 1"
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <!-- Mobile pagination -->
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ previousLabel }}
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ nextLabel }}
      </button>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ showingPageLabel }}
          <span class="font-medium">{{ currentPage }}</span> {{ ofLabel }}
          <span class="font-medium">{{ totalPages }}</span>
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
          role="navigation"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ previousLabel }}
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ nextLabel }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  PAGINATION_PREVIOUS,
  PAGINATION_NEXT,
  PAGINATION_SHOWING_PAGE,
  PAGINATION_OF,
  MAX_VISIBLE_PAGES,
} from "../constants";

interface Props {
  currentPage: number;
  totalPages: number;
  previousLabel?: string;
  nextLabel?: string;
  showingPageLabel?: string;
  ofLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  previousLabel: PAGINATION_PREVIOUS,
  nextLabel: PAGINATION_NEXT,
  showingPageLabel: PAGINATION_SHOWING_PAGE,
  ofLabel: PAGINATION_OF,
});

const emit = defineEmits<{
  "page-change": [page: number];
}>();

const visiblePages = computed(() => {
  const pages: number[] = [];
  let start = Math.max(
    1,
    props.currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
  );
  let end = Math.min(props.totalPages, start + MAX_VISIBLE_PAGES - 1);

  if (end - start < MAX_VISIBLE_PAGES - 1) {
    start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>
