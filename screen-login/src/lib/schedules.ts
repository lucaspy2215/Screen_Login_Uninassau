import { Schedule } from "@/types/schedule";

export const timeSlots: Record<number, string> = {
  1: "18:30 à 19:20",
  2: "19:20 à 20:10",
  3: "20:10 à 21:00",
  4: "21:00 à 21:50",
};

const request = async (path: string, options?: RequestInit) => {
  const confirmation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!confirmation.ok) {
    const body = await confirmation.json().catch(() => null);
    throw new Error(body?.error ?? "Erro na requisição.");
  }
  return confirmation.status === 204 ? null : confirmation.json();
};

export const getSchedules = (): Promise<Schedule[]> => request("/reservations");

export const createSchedule = (data: Record<string, unknown>) =>
  request("/reservations", { method: "POST", body: JSON.stringify(data) });

export const updateSchedule = (id: number, data: Record<string, unknown>) =>
  request(`/reservations/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteSchedule = (id: number) =>
  request(`/reservations/${id}`, { method: "DELETE" });