import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/format";
import type { BreakdownItem } from "@/@types/admin/metrics";

interface ShareBarProps {
  items: BreakdownItem[];
  labelOf?: (key: string) => string;
  /** Formata o valor secundário do rótulo (receita, por exemplo). */
  secondaryOf?: (item: BreakdownItem) => string | undefined;
  emptyMessage?: string;
}

// Parte-do-todo com poucas categorias é uma barra empilhada, não uma pizza de
// duas fatias: comparar comprimento é mais fácil do que comparar ângulo.
const SLOT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
];

export function ShareBar({
  items,
  labelOf,
  secondaryOf,
  emptyMessage = "Sem dados no período.",
}: ShareBarProps) {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {items.map((item, index) => (
          <div
            key={item.key}
            // O gap de 2px entre segmentos é o que mantém a fronteira legível
            // sem precisar de borda colorida.
            style={{
              width: `${(item.count / total) * 100}%`,
              backgroundColor: SLOT_COLORS[index % SLOT_COLORS.length],
            }}
          />
        ))}
      </div>

      <ul className="grid gap-1.5 text-xs sm:grid-cols-2">
        {items.map((item, index) => {
          const secondary = secondaryOf?.(item);

          return (
            <li key={item.key} className="flex items-center gap-2">
              <span
                className={cn("size-2.5 shrink-0 rounded-[2px]")}
                style={{
                  backgroundColor: SLOT_COLORS[index % SLOT_COLORS.length],
                }}
              />

              <span className="truncate font-medium">
                {labelOf ? labelOf(item.key) : item.key}
              </span>

              <span className="ml-auto whitespace-nowrap text-muted-foreground">
                {formatNumber(item.count)} (
                {((item.count / total) * 100).toLocaleString("pt-BR", {
                  maximumFractionDigits: 0,
                })}
                %){secondary ? ` · ${secondary}` : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
