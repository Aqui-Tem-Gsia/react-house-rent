interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function getAddressByCep(
  cep: string
): Promise<ViaCepResponse | null> {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    return null;
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data: ViaCepResponse = await response.json();

  if (data.erro) {
    return null;
  }

  return data;
}
