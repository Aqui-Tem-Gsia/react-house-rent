import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCompactCurrency, formatBucketLabel } from "@/utils/format";
import { formatCurrency } from "@/utils/masks";
import type {
  MetricsGranularity,
  MetricsTimeseriesPoint,
} from "@/@types/admin/metrics";

interface RevenueAreaChartProps {
  points: MetricsTimeseriesPoint[];
  granularity: MetricsGranularity;
}

// Série única: o título do card já a nomeia, então não leva legenda.
const chartConfig = {
  grossRevenue: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RevenueAreaChart({
  points,
  granularity,
}: RevenueAreaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <AreaChart data={points} margin={{ left: 4, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="fill-revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>

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
          width={64}
          tickFormatter={(value: number) => formatCompactCurrency(value)}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) =>
                formatBucketLabel(String(value), granularity)
              }
              formatter={(value) => formatCurrency(Number(value))}
            />
          }
        />

        <Area
          dataKey="grossRevenue"
          type="monotone"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fill-revenue)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
