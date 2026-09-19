import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MetricDelta as MetricDeltaValue } from "@/@types/admin/metrics";

interface MetricDeltaProps {
  delta: MetricDeltaValue;
  /** Quando cair é bom (reembolso, tempo de fila), inverte a leitura de cor. */
  invert?: boolean;
  className?: string;
}

// Ícone + texto carregam o sinal junto com a cor: quem não distingue
// verde de vermelho continua lendo a direção.
export function MetricDelta({ delta, invert, className }: MetricDeltaProps) {
  const { changePercent } = delta;

  if (changePercent === null) {
    return (
      <span
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground",
          className,
        )}
      >
        <Minus className="size-3" />
        sem base de comparação
      </span>
    );
  }

  const isUp = changePercent > 0;
  const isFlat = changePercent === 0;
  const isGood = invert ? !isUp : isUp;

  const Icon = isFlat ? Minus : isUp ? TrendingUp : TrendingDown;

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs font-medium",
        isFlat
          ? "text-muted-foreground"
          : isGood
            ? "text-[#0ca30c]"
            : "text-[#d03b3b]",
        className,
      )}
    >
      <Icon className="size-3" />
      {isUp ? "+" : ""}
      {changePercent.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
      <span className="font-normal text-muted-foreground">
        vs. período anterior
      </span>
    </span>
  );
}
