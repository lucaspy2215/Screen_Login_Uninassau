export type Schedule = {
  id: number;
  teacher: string;
  subject: string;
  course: string;
  lab: string;
  date: string; // "2026-11-16"
  shift: string;
  time_slot: number;
  status: "active" | "completed";
};