<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ PAGE_TITLE }}</h1>
        <ExportButton v-if="deals && deals.length > 0" @export="exportToCSV" />
      </div>

      <LoadingSpinner v-if="pending" />
      <ErrorMessage v-else-if="error" :message="error.message" />
      <EmptyState v-else-if="!deals || deals.length === 0" />
      <template v-else>
        <RaisesTable :deals="deals" />
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from "../types";
import { PAGE_TITLE } from "../constants";

const { currentPage, goToPage } = usePagination();
const { exportToCSV: exportCsv } = useCsvExport();

// Fetch deals from server
const { data, pending, error } = await useFetch<ApiResponse>("/api/deals", {
  query: computed(() => ({ page: currentPage.value })),
  watch: [currentPage],
});

const deals = computed(() => data.value?.data?.result || []);
const totalPages = computed(() => data.value?.data?.total_pages || 1);

const handlePageChange = (page: number) => {
  goToPage(page);
};

const exportToCSV = () => {
  exportCsv(deals.value, currentPage.value);
};
</script>
