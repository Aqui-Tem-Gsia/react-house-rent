import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatBucketLabel, formatNumber } from "@/utils/format";
import type {
  MetricsGranularity,
  MetricsTimeseriesPoint,
} from "@/@types/admin/metrics";

interface ListingsUsersChartProps {
  points: MetricsTimeseriesPoint[];
  granularity: MetricsGranularity;
}

// Duas séries de mesma unidade (contagem), então dividem um eixo só. Receita
// fica no gráfico ao lado justamente para não virar eixo duplo.
const chartConfig = {
  listings: {
    label: "Anúncios",
    color: "var(--chart-1)",
  },
  users: {
    label: "Usuários",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ListingsUsersChart({
  points,
  granularity,
}: ListingsUsersChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <LineChart data={points} margin={{ left: 4, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="bucket"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
          tickFormatter={(value: string) =>
            formatBucketLabel(value, granularity)
          }
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          width={40}
          allowDecimals={false}
          tickFormatter={(value: number) => formatNumber(value)}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) =>
                formatBucketLabel(String(value), granularity)
              }
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Line
          dataKey="listings"
          type="monotone"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />

        <Line
          dataKey="users"
          type="monotone"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
