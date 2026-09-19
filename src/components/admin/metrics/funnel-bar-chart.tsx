import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatNumber } from "@/utils/format";
import type { MetricsSummary } from "@/@types/admin/metrics";

interface FunnelBarChartProps {
  funnel: MetricsSummary["funnel"];
}

// Rampa ordinal de um hue só: o estágio é ordenado, não é identidade. Nenhum
// step vai mais claro que o --chart-seq-1, senão a barra some contra o fundo.
const STAGE_COLORS = [
  "var(--chart-seq-4)",
  "var(--chart-seq-3)",
  "var(--chart-seq-2)",
  "var(--chart-seq-1)",
];

const chartConfig = {
  value: { label: "Anúncios" },
} satisfies ChartConfig;

export function FunnelBarChart({ funnel }: FunnelBarChartProps) {
  const stages = [
    { stage: "Criados", value: funnel.created },
    { stage: "Pagos ou grátis", value: funnel.paidOrFree },
    { stage: "Aprovados", value: funnel.approved },
    { stage: "Ativos agora", value: funnel.activeNow },
  ];

  const top = funnel.created;

  const data = stages.map((item) => ({
    ...item,
    // Percentual em relação ao topo do funil, que é a leitura que importa.
    share: top === 0 ? 0 : item.value / top,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 72, top: 4, bottom: 4 }}
        barCategoryGap={8}
      >
        <XAxis type="number" hide />

        <YAxis
          type="category"
          dataKey="stage"
          tickLine={false}
          axisLine={false}
          width={116}
          tickMargin={4}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => formatNumber(Number(value))}
            />
          }
        />

        <Bar dataKey="value" radius={4}>
          {data.map((entry, index) => (
            <Cell key={entry.stage} fill={STAGE_COLORS[index]} />
          ))}

          {/* Rótulo direto: o contraste de alguns steps contra o fundo claro
              não é suficiente para a cor carregar o valor sozinha. */}
          <LabelList
            dataKey="value"
            position="right"
            className="fill-foreground text-xs"
            formatter={(value) => formatNumber(Number(value))}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function FunnelLegend({ funnel }: FunnelBarChartProps) {
  const top = funnel.created;

  const share = (value: number) =>
    top === 0
      ? "—"
      : `${((value / top) * 100).toLocaleString("pt-BR", {
          maximumFractionDigits: 0,
        })}%`;

  return (
    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
      <span>Pagos ou grátis: {share(funnel.paidOrFree)}</span>
      <span>Aprovados: {share(funnel.approved)}</span>
      <span>Ativos agora: {share(funnel.activeNow)}</span>
      <span>Base: {formatNumber(top)} criados</span>
    </div>
  );
}
