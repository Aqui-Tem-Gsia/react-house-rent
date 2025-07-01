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
