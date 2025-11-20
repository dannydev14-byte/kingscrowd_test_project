export interface MoneyValue {
  raw: string;
  usd: string;
  formatted: string;
}

export interface StatusObject {
  id: number;
  name: string;
  slug?: string | null;
}

export interface Deal {
  id: number;
  name: string;
  raise_status: StatusObject;
  platform_id: StatusObject;
  funding_gather_money_raised_to_date: MoneyValue;
  valuation: MoneyValue | null;
}

export interface ApiData {
  count: number;
  total_count: number;
  total_pages: number;
  current_page: number;
  result: Deal[];
}

export interface ApiStatus {
  timestamp: string;
  status_code: number;
  error_message: string | null;
  credit_cost: number;
  credits_remaining: number;
}

export interface ApiResponse {
  data: ApiData;
  status: ApiStatus;
}

export interface ApiFilter {
  key: string;
  symbol: string;
  value: string[] | string;
}

