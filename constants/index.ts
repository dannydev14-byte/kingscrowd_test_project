export const PAGE_TITLE = 'Active Reg CF & Reg A+ Raises'
export const EXPORT_CSV_BUTTON = 'Export to CSV'

export const ERROR_TITLE = 'Error loading deals'
export const ERROR_DEFAULT_MESSAGE = 'An error occurred while fetching deals'

export const EMPTY_STATE_TITLE = 'No deals found'
export const EMPTY_STATE_DESCRIPTION = 'No active Reg CF or Reg A+ raises are currently available.'

export const TABLE_HEADERS = {
  RAISE_NAME: 'Raise Name',
  RAISE_STATUS: 'Raise Status',
  PLATFORM: 'Platform',
  MONEY_RAISED: 'Money Raised to Date',
  VALUATION: 'Valuation'
} as const

export const CSV_HEADERS = [
  TABLE_HEADERS.RAISE_NAME,
  TABLE_HEADERS.RAISE_STATUS,
  TABLE_HEADERS.PLATFORM,
  TABLE_HEADERS.MONEY_RAISED,
  TABLE_HEADERS.VALUATION
]

export const CSV_FILENAME_PREFIX = 'kingscrowd-raises-page-'
export const CSV_FILENAME_SUFFIX = '.csv'

export const PAGINATION_PREVIOUS = 'Previous'
export const PAGINATION_NEXT = 'Next'
export const PAGINATION_SHOWING_PAGE = 'Showing page'
export const PAGINATION_OF = 'of'

export const FALLBACK_NA = 'N/A'

export const MAX_VISIBLE_PAGES = 5

// API Configuration
export const API_BASE_URL = "https://api.kingscrowd.dev/api/v1";
export const API_ENDPOINTS = {
  DEALS: "/deals",
} as const;

// Filter values
export const FILTER_VALUES = {
  RAISE_STATUS: {
    ACTIVE: "Active",
  },
  CROWDFUNDING_TYPE: {
    REG_CF: "RegCF",
    REG_A_PLUS: "RegA+",
  },
} as const;

