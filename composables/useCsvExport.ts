import type { Deal } from "../types";
import {
  CSV_HEADERS,
  CSV_FILENAME_PREFIX,
  CSV_FILENAME_SUFFIX,
  FALLBACK_NA,
} from "../constants";

export const useCsvExport = () => {
  const exportToCSV = (deals: Deal[], pageNumber: number = 1) => {
    if (!deals || deals.length === 0) {
      console.warn("No deals to export");
      return;
    }

    const rows = deals.map((deal) => [
      deal.name || FALLBACK_NA,
      deal.raise_status?.name || FALLBACK_NA,
      deal.platform_id?.name || FALLBACK_NA,
      deal.funding_gather_money_raised_to_date?.formatted || FALLBACK_NA,
      deal.valuation?.formatted || FALLBACK_NA,
    ]);

    const csvContent = [
      CSV_HEADERS.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${CSV_FILENAME_PREFIX}${pageNumber}${CSV_FILENAME_SUFFIX}`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(url);
  };

  return {
    exportToCSV,
  };
};

