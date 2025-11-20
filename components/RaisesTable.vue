<template>
  <div class="bg-white shadow-sm rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table
        class="min-w-full divide-y divide-gray-200"
        role="table"
        aria-label="Active Reg CF and Reg A+ Raises"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="deal in deals"
            :key="deal.id"
            class="hover:bg-gray-50"
            role="row"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ deal.name || fallback }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
                {{ deal.raise_status?.name || fallback }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ deal.platform_id?.name || fallback }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{
                deal.funding_gather_money_raised_to_date?.formatted || fallback
              }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ deal.valuation?.formatted || fallback }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Deal } from "../types";
import { TABLE_HEADERS, FALLBACK_NA } from "../constants";

interface Props {
  deals: Deal[];
  fallback?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fallback: FALLBACK_NA,
});

const headers = [
  TABLE_HEADERS.RAISE_NAME,
  TABLE_HEADERS.RAISE_STATUS,
  TABLE_HEADERS.PLATFORM,
  TABLE_HEADERS.MONEY_RAISED,
  TABLE_HEADERS.VALUATION,
];
</script>
