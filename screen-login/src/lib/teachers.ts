import { request } from "@/lib/api";
import type { Teacher } from "@/types/teacher";

const TEACHER_ROLE = "teacher";

type UserResponse = {
  id: number;
  name: string;
  email: string;
  registration_number?: string;
  role: "teacher" | "admin";
  is_active: number | boolean;
};

export const getTeachers = async (): Promise<Teacher[]> => {
  const users = await request<UserResponse[]>("/users");

  return users
    .filter(
      (user) => user.role === TEACHER_ROLE && Number(user.is_active) === 1,
    )
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      registration_number: user.registration_number ?? "",
      role: user.role,
      is_active: user.is_active,
    }));
};

export const createTeacher = (data: Record<string, unknown>) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify({ ...data, role: TEACHER_ROLE }),
  });

export const updateTeacher = (id: number, data: Record<string, unknown>) =>
  request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, role: TEACHER_ROLE }),
  });

export const deleteTeacher = (id: number) =>
  request(`/users/${id}`, {
    method: "DELETE",
  });

export const activateAccount = (token: string, password: string) =>
  request("/users/activate", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
