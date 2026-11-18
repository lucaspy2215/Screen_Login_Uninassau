import { request } from "@/lib/api";
import { Schedule } from "@/types/schedule";

export const timeSlots: Record<number, string> = {
  1: "18:30 à 19:20",
  2: "19:20 às 20:10",
  3: "20:10 à 21:00",
  4: "21:00 à 21:50",
};


export const getSchedules = (): Promise<Schedule[]> => request("/reservations");

export const createSchedule = (data: Record<string, unknown>) =>
  request("/reservations", { method: "POST", body: JSON.stringify(data) });

export const updateSchedule = (id: number, data: Record<string, unknown>) =>
  request(`/reservations/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteSchedule = (id: number) =>
  request(`/reservations/${id}`, { method: "DELETE" });