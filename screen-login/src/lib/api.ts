export const request = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Erro na requisição.");
  }
  return res.status === 204 ? null : res.json();
};