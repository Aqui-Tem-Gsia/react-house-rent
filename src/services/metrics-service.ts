import api from "@/interceptors/api";
import type {
  MetricsBreakdowns,
  MetricsOperations,
  MetricsQueryParams,
  MetricsSummary,
  MetricsTimeseries,
  MetricsTimeseriesParams,
} from "@/@types/admin/metrics";

// baseURL e header Authorization já vêm do interceptor em @/interceptors/api —
// não repetir aqui.

export async function getMetricsSummary(params: MetricsQueryParams) {
  const { data } = await api.get<MetricsSummary>("/admin/metrics/summary", {
    params,
  });

  return data;
}

export async function getMetricsTimeseries(params: MetricsTimeseriesParams) {
  const { data } = await api.get<MetricsTimeseries>(
    "/admin/metrics/timeseries",
    { params },
  );

  return data;
}

export async function getMetricsBreakdowns(params: MetricsQueryParams) {
  const { data } = await api.get<MetricsBreakdowns>(
    "/admin/metrics/breakdowns",
    { params },
  );

  return data;
}

export async function getMetricsOperations() {
  const { data } = await api.get<MetricsOperations>(
    "/admin/metrics/operations",
  );

  return data;
}
