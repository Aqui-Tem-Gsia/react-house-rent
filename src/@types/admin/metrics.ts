// Espelho de nest-house-rent/src/routes/admin/metrics/metrics.types.ts.
// Mudou lá? Muda aqui.

export type ListingTypeFilter = "RENT" | "SALE";

export type MetricsGranularity = "day" | "week" | "month";

export interface MetricsQueryParams {
  from?: string;
  to?: string;
  listingType?: ListingTypeFilter;
}

export interface MetricsTimeseriesParams extends MetricsQueryParams {
  granularity?: MetricsGranularity;
}

export interface MetricsPeriod {
  from: string;
  to: string;
  previousFrom: string;
  previousTo: string;
}

export interface MetricDelta {
  value: number;
  previous: number;
  /** null quando não há período anterior com que comparar. */
  changePercent: number | null;
}

export interface MetricsSummary {
  period: MetricsPeriod;
  users: {
    total: number;
    new: MetricDelta;
  };
  listings: {
    created: MetricDelta;
    /** ACTIVE + não expirado + dono ativo. Snapshot, ignora o período. */
    activeNow: number;
    /** ACTIVE porém já vencido — dívida da expiração preguiçosa. */
    staleActive: number;
    free: number;
    paid: number;
    adminCourtesy: number;
  };
  revenue: {
    gross: MetricDelta;
    net: MetricDelta;
    /** Pagamentos sem valor líquido: a receita líquida está subestimada. */
    netValueMissing: number;
    averageTicket: MetricDelta;
    paymentsCount: number;
    refundedAmount: number;
  };
  engagement: {
    totalViewsAllTime: number;
  };
  rates: {
    approvalRate: number | null;
    blockRate: number | null;
    refundRequestRate: number | null;
    refundApprovalRate: number | null;
  };
  funnel: {
    created: number;
    paidOrFree: number;
    approved: number;
    activeNow: number;
  };
  timings: {
    avgHoursToPay: number | null;
    avgHoursToApprove: number | null;
  };
}

export interface MetricsTimeseriesPoint {
  /** Início do bucket em horário de Brasília (yyyy-MM-dd). */
  bucket: string;
  listings: number;
  users: number;
  grossRevenue: number;
  netRevenue: number;
  payments: number;
}

export interface MetricsTimeseries {
  period: MetricsPeriod;
  granularity: MetricsGranularity;
  points: MetricsTimeseriesPoint[];
}

export interface BreakdownItem {
  key: string;
  count: number;
  revenue?: number;
}

export interface MetricsBreakdowns {
  period: MetricsPeriod;
  byListingStatus: BreakdownItem[];
  byPropertyType: BreakdownItem[];
  byListingType: BreakdownItem[];
  byBillingType: BreakdownItem[];
  byPlan: Array<{
    planId: string;
    name: string;
    isFree: boolean;
    listings: number;
    revenue: number;
  }>;
  topLocations: Array<{ state: string; city: string; count: number }>;
  refundReasons: Array<{ reason: string; count: number }>;
}

export interface MetricsOperations {
  generatedAt: string;
  queue: {
    pendingReview: number;
    oldestPendingReviewAt: string | null;
    pendingRefunds: number;
    oldestPendingRefundAt: string | null;
    expiringIn7Days: number;
    staleActive: number;
    abandonedCheckout: number;
  };
  topViewedListings: Array<{
    id: string;
    title: string;
    views: number;
    status: string;
    type: string;
    city: string | null;
    state: string | null;
  }>;
}
