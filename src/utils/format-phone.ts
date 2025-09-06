export const formatPhone = (phone?: string | null) => {
  if (!phone) return "-";
  return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
};
