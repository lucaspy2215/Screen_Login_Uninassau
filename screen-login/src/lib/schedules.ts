import { request } from "@/lib/api";
import { Schedule } from "@/types/schedule";

export const timeSlots: Record<"Manhã" | "Noite", Record<number, string>> = {
  Manhã: {
    1: "07:30 às 08:20",
    2: "08:20 às 09:10",
    3: "09:10 às 10:00",
    4: "10:20 às 11:10",
    5: "11:10 às 12:00",
  },
  Noite: {
    1: "18:30 às 19:20",
    2: "19:20 às 20:10",
    3: "20:10 às 21:00",
    4: "21:00 às 21:50",
  },
};

export const getPublicSchedules = (): Promise<Schedule[]> =>
  request("/reservations");

export const getSchedules = (): Promise<Schedule[]> =>
  request("/reservations/manage");

export const createSchedule = (data: Record<string, unknown>) =>
  request("/reservations", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateSchedule = (id: number, data: Record<string, unknown>) =>
  request(`/reservations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteSchedule = (id: number) =>
  request(`/reservations/${id}`, {
    method: "DELETE",
  });

export const requestCancellation = (id: number) =>
  request(`/reservations/${id}/request-cancellation`, {
    method: "PATCH",
  });

export const approveSchedule = (id: number) =>
  request(`/reservations/${id}/approve`, {
    method: "PATCH",
  });

export const rejectSchedule = (id: number) =>
  request(`/reservations/${id}/reject`, {
    method: "PATCH",
  });
