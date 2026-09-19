const onlyDigits = (value: string) => value.replace(/\D/g, "");

// (62) 1234-5678 (fixo) ou (62) 91234-5678 (celular), aplicada enquanto digita.
export const maskPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  const splitAt = rest.length > 8 ? 5 : 4;

  if (rest.length <= splitAt) return `(${ddd}) ${rest}`;
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`;
};

// 00000-000
export const maskCep = (value: string) => {
  const digits = onlyDigits(value).slice(0, 8);

  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

// UF: só letras, maiúsculas, 2 caracteres.
export const maskState = (value: string) =>
  value
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 2);

// R$ 250.000,00 — digitação preenche a partir dos centavos.
export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Retorna o valor em reais, ou NaN quando o campo está vazio.
export const parseCurrency = (value: string) => {
  const digits = onlyDigits(value);
  return digits === "" ? Number.NaN : Number(digits) / 100;
};
