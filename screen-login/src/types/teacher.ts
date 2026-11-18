export type Teacher = {
  id: number;
  name: string;
  email: string;
  matricula: string;
  role: "teacher" | "admin";
};