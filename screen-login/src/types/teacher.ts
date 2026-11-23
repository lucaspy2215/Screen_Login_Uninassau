export type Teacher = {
  id: number;
  name: string;
  email: string;
  registration_number: string;
  role: "teacher" | "admin";
  is_active: number | boolean;
};
