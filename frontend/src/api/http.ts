const API_URL = 'http://localhost:5259/api';

export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = 'Erro ao comunicar com a API';

    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {
      // resposta sem corpo
    }

    throw new Error(errorMessage);
  }

  // ✅ CORREÇÃO PRINCIPAL
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}