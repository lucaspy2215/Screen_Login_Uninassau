import { getSession } from "./auth";

export const request = async <T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const headers = new Headers(options?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const session = getSession();

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    throw new Error(body?.error ?? "Erro na requisição.");
  }

  if (res.status === 204) {
    return null as T;
  }

  return (await res.json()) as T;
};
