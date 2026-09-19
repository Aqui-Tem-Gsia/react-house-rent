import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  Banknote,
  CircleDollarSign,
  Clock,
  Megaphone,
  Receipt,
  RotateCcw,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricsFilters } from "@/components/admin/metrics/metrics-filters";
import { rangeFromPreset, type MetricsRange } from "@/utils/metrics-range";
import { KpiCard, KpiCardSkeleton } from "@/components/admin/metrics/kpi-card";
import {
  OperationsQueue,
  OperationsQueueSkeleton,
} from "@/components/admin/metrics/operations-queue";
import { RevenueAreaChart } from "@/components/admin/metrics/revenue-area-chart";
import { ListingsUsersChart } from "@/components/admin/metrics/listings-users-chart";
import {
  FunnelBarChart,
  FunnelLegend,
} from "@/components/admin/metrics/funnel-bar-chart";
import { BreakdownBarChart } from "@/components/admin/metrics/breakdown-bar-chart";
import { QueryBoundary } from "@/components/admin/metrics/query-boundary";
import { ShareBar } from "@/components/admin/metrics/share-bar";
import { TopListingsTable } from "@/components/admin/metrics/top-listings-table";
import {
  useMetricsBreakdowns,
  useMetricsOperations,
  useMetricsSummary,
  useMetricsTimeseries,
} from "@/hooks/use-metrics";
import {
  formatCompactCurrency,
  formatHours,
  formatNumber,
  formatRate,
} from "@/utils/format";
import { formatCurrency } from "@/utils/masks";
import {
  translateBillingType,
  translateListingStatus,
  translateListingType,
  translatePropertyType,
} from "@/utils/translate";
import type { ListingType } from "@/@types/admin/listing-type";
import type { PropertyType } from "@/@types/admin/property-type";
import type {
  ListingTypeFilter,
  MetricsGranularity,
} from "@/@types/admin/metrics";

const DEFAULT_RANGE = rangeFromPreset(30);

const GRANULARITIES: Array<{ value: MetricsGranularity; label: string }> = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mês" },
];

function ChartCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[220px] w-full" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

export const AdminHomePage = () => {
  // Período e filtros na URL: sobrevivem ao refresh e dão link compartilhável.
  const [searchParams, setSearchParams] = useSearchParams();

  const range: MetricsRange = {
    from: searchParams.get("from") ?? DEFAULT_RANGE.from,
    to: searchParams.get("to") ?? DEFAULT_RANGE.to,
  };

  const listingType =
    (searchParams.get("listingType") as ListingTypeFilter | null) ?? undefined;

  const granularity =
    (searchParams.get("granularity") as MetricsGranularity | null) ?? "day";

  const updateParams = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === undefined) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next, { replace: true });
  };

  // Um objeto estável por render evita refazer a query só porque a
  // identidade da chave mudou.
  const periodParams = useMemo(
    () => ({ from: range.from, to: range.to, listingType }),
    [range.from, range.to, listingType],
  );

  const summaryQuery = useMetricsSummary(periodParams);
  const timeseriesQuery = useMetricsTimeseries({
    ...periodParams,
    granularity,
  });
  const breakdownsQuery = useMetricsBreakdowns(periodParams);
  const operationsQuery = useMetricsOperations();

  // Só o total de receita é lido fora de um QueryBoundary, como rodapé do
  // gráfico; todo o resto passa pelo boundary.
  const summary = summaryQuery.data;

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Visão geral</h1>
          <p className="text-sm text-muted-foreground">
            Como o negócio está indo e o que precisa da sua atenção agora.
          </p>
        </div>

        <MetricsFilters
          range={range}
          listingType={listingType}
          onRangeChange={(next) =>
            updateParams({ from: next.from, to: next.to })
          }
          onListingTypeChange={(next) => updateParams({ listingType: next })}
        />
      </header>

      {/* A fila vem antes dos gráficos: é a resposta de "o que eu faço agora". */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Precisa de ação
        </h2>

        <QueryBoundary
          query={operationsQuery}
          skeleton={<OperationsQueueSkeleton />}
        >
          {(operations) => <OperationsQueue data={operations} />}
        </QueryBoundary>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Resultados do período
        </h2>

        <QueryBoundary
          query={summaryQuery}
          skeleton={
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <KpiCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          {(summary) => (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                title="Receita bruta"
                value={formatCurrency(summary.revenue.gross.value)}
                icon={Banknote}
                delta={summary.revenue.gross}
                hint={`${formatNumber(summary.revenue.paymentsCount)} pagamentos`}
              />

              <KpiCard
                title="Anúncios criados"
                value={formatNumber(summary.listings.created.value)}
                icon={Megaphone}
                delta={summary.listings.created}
                hint={`${formatNumber(summary.listings.paid)} pagos · ${formatNumber(
                  summary.listings.free,
                )} grátis`}
              />

              <KpiCard
                title="Anúncios ativos"
                value={formatNumber(summary.listings.activeNow)}
                icon={BadgeCheck}
                hint="publicados e dentro da validade"
              />

              <KpiCard
                title="Novos usuários"
                value={formatNumber(summary.users.new.value)}
                icon={Users}
                delta={summary.users.new}
                hint={`${formatNumber(summary.users.total)} no total`}
              />
            </div>
          )}
        </QueryBoundary>

        <QueryBoundary
          query={summaryQuery}
          skeleton={
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <KpiCardSkeleton key={index} compact />
              ))}
            </div>
          }
        >
          {(summary) => (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                compact
                title="Ticket médio"
                value={formatCurrency(summary.revenue.averageTicket.value)}
                icon={Receipt}
                delta={summary.revenue.averageTicket}
              />

              <KpiCard
                compact
                title="Taxa de aprovação"
                value={formatRate(summary.rates.approvalRate)}
                icon={BadgeCheck}
                hint={`${formatRate(summary.rates.blockRate)} bloqueados`}
              />

              <KpiCard
                compact
                title="Pedidos de reembolso"
                value={formatRate(summary.rates.refundRequestRate)}
                icon={RotateCcw}
                hint={`${formatCurrency(
                  summary.revenue.refundedAmount,
                )} devolvidos`}
              />

              <KpiCard
                compact
                title="Tempo até o pagamento"
                value={formatHours(summary.timings.avgHoursToPay)}
                icon={Clock}
                hint={`${formatHours(
                  summary.timings.avgHoursToApprove,
                )} até aprovar`}
              />
            </div>
          )}
        </QueryBoundary>

        {summary && summary.revenue.netValueMissing > 0 && (
          <p className="text-xs text-muted-foreground">
            {formatNumber(summary.revenue.netValueMissing)} pagamento(s) sem
            valor líquido informado pelo gateway — a receita líquida está
            subestimada.
          </p>
        )}
      </section>

      {/* Receita e contagem têm escalas diferentes: dois cards, nunca dois
          eixos no mesmo gráfico. */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div>
              <CardTitle>Receita</CardTitle>
              <CardDescription>
                Pagamentos confirmados no período
              </CardDescription>
            </div>

            <Tabs
              value={granularity}
              onValueChange={(value) => updateParams({ granularity: value })}
            >
              <TabsList className="h-8">
                {GRANULARITIES.map(({ value, label }) => (
                  <TabsTrigger key={value} value={value} className="text-xs">
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={timeseriesQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(timeseries) => (
                <>
                  <RevenueAreaChart
                    points={timeseries.points}
                    granularity={timeseries.granularity}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Total no período:{" "}
                    {formatCompactCurrency(summary?.revenue.gross.value ?? 0)}
                  </p>
                </>
              )}
            </QueryBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anúncios e usuários</CardTitle>
            <CardDescription>Novos cadastros por período</CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={timeseriesQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(timeseries) => (
                <ListingsUsersChart
                  points={timeseries.points}
                  granularity={timeseries.granularity}
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funil de publicação</CardTitle>
            <CardDescription>
              Onde o anunciante para, entre criar e ficar no ar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <QueryBoundary
              query={summaryQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(summary) => (
                <>
                  <FunnelBarChart funnel={summary.funnel} />
                  <FunnelLegend funnel={summary.funnel} />
                </>
              )}
            </QueryBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Situação dos anúncios</CardTitle>
            <CardDescription>Criados no período, por situação</CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={breakdownsQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(breakdowns) => (
                <BreakdownBarChart
                  items={breakdowns.byListingStatus}
                  labelOf={translateListingStatus}
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aluguel e venda</CardTitle>
            <CardDescription>Divisão dos anúncios do período</CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={breakdownsQuery}
              skeleton={<Skeleton className="h-24 w-full" />}
            >
              {(breakdowns) => (
                <ShareBar
                  items={breakdowns.byListingType}
                  labelOf={(key) => translateListingType(key as ListingType)}
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meios de pagamento</CardTitle>
            <CardDescription>
              Pagamentos confirmados, com a receita de cada meio
            </CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={breakdownsQuery}
              skeleton={<Skeleton className="h-24 w-full" />}
            >
              {(breakdowns) => (
                <ShareBar
                  items={breakdowns.byBillingType}
                  labelOf={translateBillingType}
                  secondaryOf={(item) =>
                    item.revenue === undefined
                      ? undefined
                      : formatCompactCurrency(item.revenue)
                  }
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tipos de imóvel</CardTitle>
            <CardDescription>Anúncios criados no período</CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={breakdownsQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(breakdowns) => (
                <BreakdownBarChart
                  items={breakdowns.byPropertyType}
                  labelOf={(key) => translatePropertyType(key as PropertyType)}
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cidades com mais anúncios</CardTitle>
            <CardDescription>Top 10 no período</CardDescription>
          </CardHeader>

          <CardContent>
            <QueryBoundary
              query={breakdownsQuery}
              skeleton={<ChartCardSkeleton />}
            >
              {(breakdowns) => (
                <BreakdownBarChart
                  items={breakdowns.topLocations.map((location) => ({
                    key: `${location.city}/${location.state}`,
                    count: location.count,
                  }))}
                />
              )}
            </QueryBoundary>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Planos</CardTitle>
          <CardDescription>
            Anúncios e receita por plano no período
          </CardDescription>
        </CardHeader>

        <CardContent>
          <QueryBoundary
            query={breakdownsQuery}
            skeleton={<Skeleton className="h-32 w-full" />}
          >
            {(breakdowns) =>
              breakdowns.byPlan.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhum anúncio com plano no período.
                </p>
              ) : (
                <ul className="divide-y text-sm">
                  {breakdowns.byPlan.map((plan) => (
                    <li
                      key={plan.planId}
                      className="flex items-center justify-between gap-3 py-2"
                    >
                      <span className="truncate font-medium">
                        {plan.name}
                        {plan.isFree && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            grátis
                          </span>
                        )}
                      </span>

                      <span className="whitespace-nowrap text-muted-foreground">
                        {formatNumber(plan.listings)} anúncios ·{" "}
                        {formatCurrency(plan.revenue)}
                      </span>
                    </li>
                  ))}
                </ul>
              )
            }
          </QueryBoundary>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="size-4 text-muted-foreground" />
            Anúncios mais vistos
          </CardTitle>
          <CardDescription>
            Visualizações acumuladas desde a publicação — não é filtrado por
            período
          </CardDescription>
        </CardHeader>

        <CardContent>
          <QueryBoundary
            query={operationsQuery}
            skeleton={<Skeleton className="h-48 w-full" />}
          >
            {(operations) => (
              <TopListingsTable listings={operations.topViewedListings} />
            )}
          </QueryBoundary>
        </CardContent>
      </Card>
    </div>
  );
};
