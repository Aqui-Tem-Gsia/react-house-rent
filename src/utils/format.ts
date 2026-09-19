export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatPrice(value: number, type: "SALE" | "RENT"): string {
  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

  if (type === "RENT") {
    return `${formatted}/mês`;
  }

  return formatted;
}

// Eixo de gráfico e card de KPI não cabem "R$ 1.248.000,00": o valor cheio
// fica no tooltip.
export function formatCompactCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  });
}

export function formatCompactNumber(value: number): string {
  return value.toLocaleString("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

/** Recebe a razão (0..1), devolve percentual. */
export function formatRate(value: number | null): string {
  if (value === null) return "—";

  return `${(value * 100).toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })}%`;
}

export function formatHours(value: number | null): string {
  if (value === null) return "—";

  if (value < 24) {
    return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}h`;
  }

  return `${(value / 24).toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })}d`;
}

/** "há 4 dias" / "há 3 horas" para a idade do item mais antigo da fila. */
export function formatAge(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const elapsedHours = (Date.now() - new Date(isoDate).getTime()) / 36e5;

  if (elapsedHours < 1) return "há menos de 1h";
  if (elapsedHours < 24) return `há ${Math.floor(elapsedHours)}h`;

  return `há ${Math.floor(elapsedHours / 24)}d`;
}

/** Rótulo curto de eixo a partir do bucket yyyy-MM-dd devolvido pela API. */
export function formatBucketLabel(
  bucket: string,
  granularity: "day" | "week" | "month",
): string {
  // Sem o T12:00 o Date interpretaria como UTC e voltaria um dia no fuso local.
  const date = new Date(`${bucket}T12:00:00`);

  if (granularity === "month") {
    return date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "2-digit",
    });
  }

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}
