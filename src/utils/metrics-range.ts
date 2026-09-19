export interface MetricsRange {
  from: string;
  to: string;
}

/** A API espera yyyy-MM-dd e expande para o dia civil de Brasília. */
export function toIsoDay(date: Date): string {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function rangeFromPreset(days: number): MetricsRange {
  const to = new Date();
  const from = new Date();

  from.setDate(from.getDate() - days);

  return { from: toIsoDay(from), to: toIsoDay(to) };
}

/** T12:00 evita o Date tratar como UTC e voltar um dia no fuso local. */
export function parseIsoDay(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

export function formatRangeLabel({ from, to }: MetricsRange): string {
  const format = (value: string) =>
    parseIsoDay(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

  return from === to ? format(from) : `${format(from)} – ${format(to)}`;
}
