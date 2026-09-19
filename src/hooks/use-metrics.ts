import { useQuery } from "@tanstack/react-query";

import {
  getMetricsBreakdowns,
  getMetricsOperations,
  getMetricsSummary,
  getMetricsTimeseries,
} from "@/services/metrics-service";
import type {
  MetricsQueryParams,
  MetricsTimeseriesParams,
} from "@/@types/admin/metrics";

// O admin deixa o painel aberto: sem staleTime, o refetch em foco de janela
// refaria as agregações a cada alt-tab.
const PERIOD_STALE_TIME = 5 * 60 * 1000;

// A fila é o que o admin usa para trabalhar — não pode ficar mostrando
// "12 pendentes" depois que ele aprovou um.
const QUEUE_REFETCH_INTERVAL = 30 * 1000;

export function useMetricsSummary(params: MetricsQueryParams) {
  return useQuery({
    queryKey: ["metrics", "summary", params],
    queryFn: () => getMetricsSummary(params),
    staleTime: PERIOD_STALE_TIME,
  });
}

export function useMetricsTimeseries(params: MetricsTimeseriesParams) {
  return useQuery({
    queryKey: ["metrics", "timeseries", params],
    queryFn: () => getMetricsTimeseries(params),
    staleTime: PERIOD_STALE_TIME,
  });
}

export function useMetricsBreakdowns(params: MetricsQueryParams) {
  return useQuery({
    queryKey: ["metrics", "breakdowns", params],
    queryFn: () => getMetricsBreakdowns(params),
    staleTime: PERIOD_STALE_TIME,
  });
}

export function useMetricsOperations() {
  return useQuery({
    queryKey: ["metrics", "operations"],
    queryFn: getMetricsOperations,
    staleTime: QUEUE_REFETCH_INTERVAL,
    refetchInterval: QUEUE_REFETCH_INTERVAL,
  });
}
