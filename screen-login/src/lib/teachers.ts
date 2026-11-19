import { request } from "@/lib/api";
import { Teacher } from "@/types/teacher";

const TEACHER_ROLE = "teacher";

// the API returns everyone in "pessoas", so we keep only the teachers
export const getTeachers = async (): Promise<Teacher[]> => {
  const users: Teacher[] = await request("/users");
  return users.filter((user) => user.role === TEACHER_ROLE);
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
  request(`/users/${id}`, { method: "DELETE" });


export const activateAccount = (token: string, password: string) =>
  request("/users/activate", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });