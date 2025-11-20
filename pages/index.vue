<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ PAGE_TITLE }}</h1>
          <div v-if="totalCount !== null" class="mt-2 flex items-center gap-2">
            <span class="text-sm text-gray-600">Total deals: <span class="font-semibold">{{ totalCount }}</span></span>
            <span
              :class="[
                'px-2 py-0.5 text-xs font-medium rounded-full',
                isWithinExpectedRange
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              {{ isWithinExpectedRange ? '✓ Expected range' : '⚠ Check count' }}
            </span>
          </div>
        </div>
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
const totalCount = computed(() => data.value?.data?.total_count ?? null);

// Sanity check: expected ~500 deals (accepting range of 400-600)
const EXPECTED_COUNT = 500;
const COUNT_TOLERANCE = 100;
const isWithinExpectedRange = computed(() => {
  if (totalCount.value === null) return false;
  return Math.abs(totalCount.value - EXPECTED_COUNT) <= COUNT_TOLERANCE;
});

const handlePageChange = (page: number) => {
  goToPage(page);
};

const exportToCSV = () => {
  exportCsv(deals.value, currentPage.value);
};
</script>
