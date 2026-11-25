
export type ReportReservation = {
  id: number;
  user_id: number;
  teacher: string;
  subject: string;
  course: string;
  lab: string;
  date: string;
  shift: string;
  time_slot: number;
  status: "completed";
};

export type ReportGroup = {
  name: string;
  total: number;
};

export type ReportIndicators = {
  totalCompleted: number;
  byLab: ReportGroup[];
  byShift: ReportGroup[];
  byCourse: ReportGroup[];
  byTeacher: ReportGroup[];
  byTimeSlot: ReportGroup[];
  byMonth: ReportGroup[];
  bySemester: ReportGroup[];
  highestMonth: ReportGroup | null;
  mostUsedTimeSlot: ReportGroup | null;
};

export type ReportResponse = {
  reservations: ReportReservation[];
  indicators: ReportIndicators;
};

export type ReportFilters = {
  startDate?: string;
  endDate?: string;
  lab?: string;
  shift?: string;
  teacher?: string;
  course?: string;
};
