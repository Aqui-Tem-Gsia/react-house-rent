import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatNumber } from "@/utils/format";
import type { BreakdownItem } from "@/@types/admin/metrics";

interface BreakdownBarChartProps {
  items: BreakdownItem[];
  /** Traduz a chave crua da API (enum, sigla) para o rótulo do eixo. */
  labelOf?: (key: string) => string;
  emptyMessage?: string;
}

// Comparar magnitude entre categorias: um hue só, ordenado. Cor categórica
// aqui só espalharia hue sem significado.
const chartConfig = {
  count: { label: "Total", color: "var(--chart-seq-3)" },
} satisfies ChartConfig;

export function BreakdownBarChart({
  items,
  labelOf,
  emptyMessage = "Sem dados no período.",
}: BreakdownBarChartProps) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const data = items.map((item) => ({
    ...item,
    label: labelOf ? labelOf(item.key) : item.key,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full"
      style={{ height: Math.max(160, data.length * 32 + 24) }}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 56, top: 4, bottom: 4 }}
        barCategoryGap={6}
      >
        <XAxis type="number" hide />

        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={136}
          tickMargin={4}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => formatNumber(Number(value))}
            />
          }
        />

        <Bar dataKey="count" fill="var(--chart-seq-3)" radius={4}>
          <LabelList
            dataKey="count"
            position="right"
            className="fill-foreground text-xs"
            formatter={(value) => formatNumber(Number(value))}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
