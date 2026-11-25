export type Schedule = {
  id: number;
  teacher: string;
  subject: string;
  course: string;
  lab: string;
  date: string;
  shift: string;
  time_slot: number;
  status:
    | "pending"
    | "active"
    | "completed"
    | "rejected"
    | "cancelled"
    | "cancellation_requested";
};
