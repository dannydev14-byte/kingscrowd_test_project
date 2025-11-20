import type { ApiFilter } from "../../types";
import { API_BASE_URL, API_ENDPOINTS, FILTER_VALUES } from "../../constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.kingscrowdApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API key not configured",
    });
  }

  const query = getQuery(event);
  const page = query.page ? parseInt(query.page as string) : 1;

  // Validate page number
  if (isNaN(page) || page < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid page number",
    });
  }

  // Build filters for Active status and Reg CF/Reg A+ crowdfunding types
  const filters: ApiFilter[] = [
    {
      key: "raise_status",
      symbol: "=",
      value: [FILTER_VALUES.RAISE_STATUS.ACTIVE],
    },
    {
      key: "crowdfunding_type_1",
      symbol: "IN",
      value: [
        FILTER_VALUES.CROWDFUNDING_TYPE.REG_CF,
        FILTER_VALUES.CROWDFUNDING_TYPE.REG_A_PLUS,
      ],
    },
  ];

  try {
    const response = await $fetch(`${API_BASE_URL}${API_ENDPOINTS.DEALS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        filters: JSON.stringify(filters),
      },
    });

    return response;
  } catch (error: any) {
    // Handle specific error cases
    if (error.statusCode === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: Invalid API key",
      });
    }

    if (error.statusCode === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: "Rate limit exceeded. Please try again later.",
      });
    }

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch deals",
    });
  }
});

