import { useCallback, useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

import { getSession } from "@/lib/auth";
import { closedFormValues } from "@/lib/forms";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  requestCancellation,
  updateSchedule,
} from "@/lib/schedules";
import { getTeachers } from "@/lib/teachers";
import type { Schedule } from "@/types/schedule";
import type { Teacher } from "@/types/teacher";

const teacherVisibleStatuses = [
  "pending",
  "active",
  "cancellation_requested",
  "completed",
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [deleting, setDeleting] = useState<Schedule | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  const [teacherLoadFailed, setTeacherLoadFailed] = useState(false);

  const role = getSession()?.user.role;

  const loadSchedules = useCallback(async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    }
  }, []);

  const loadTeachers = useCallback(async () => {
    setTeachersLoading(true);

    try {
      const data = await getTeachers();
      setTeachers(data);
      setTeacherLoadFailed(false);
    } catch {
      setTeachers([]);
      setTeacherLoadFailed(true);
    } finally {
      setTeachersLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchedules();

    if (role === "admin") {
      loadTeachers();
    } else {
      setTeachersLoading(false);
    }
  }, [loadSchedules, loadTeachers, role]);

  const visibleSchedules =
    role === "teacher"
      ? schedules.filter((item) => teacherVisibleStatuses.includes(item.status))
      : schedules;

  const filtered = visibleSchedules.filter((item) => {
    const searchTerm = normalize(search);

    if (!searchTerm) return true;

    const [year, month, day] = item.date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    const compactDate = `${day}${month}${year}`;
    const numericSearch = searchTerm.replace(/\D/g, "");

    const searchableFields = [
      item.teacher,
      item.subject,
      item.course,
      item.lab,
      item.shift,
      item.status,
      item.date,
      formattedDate,
    ];

    const matchesText = searchableFields.some((field) =>
      normalize(String(field ?? "")).includes(searchTerm),
    );

    const matchesCompactDate =
      numericSearch.length > 0 && compactDate.includes(numericSearch);

    return matchesText || matchesCompactDate;
  });

  const closeModals = () => {
    setCreating(false);
    setEditing(null);
    setDeleting(null);
    setError("");
  };

  const runAndRefresh = async (
    action: () => Promise<unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      await action();
      await loadSchedules();
      closeModals();
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCreateSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = closedFormValues(e);

    void runAndRefresh(
      () => createSchedule(data),
      () => setCreateSuccess(true),
    );
  };

  const handleEditSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editing) return;

    const data = closedFormValues(e);

    void runAndRefresh(
      () => updateSchedule(editing.id, data),
      () => setEditSuccess(true),
    );
  };

  const confirmDelete = () => {
    if (!deleting) return;

    const action =
      role === "teacher"
        ? () => requestCancellation(deleting.id)
        : () => deleteSchedule(deleting.id);

    void runAndRefresh(action, () => setDeleteSuccess(true));
  };

  return {
    filtered,
    teachers,
    teachersLoading,
    teacherLoadFailed,
    search,
    setSearch,
    creating,
    setCreating,
    editing,
    setEditing,
    deleting,
    setDeleting,
    editSuccess,
    setEditSuccess,
    createSuccess,
    setCreateSuccess,
    deleteSuccess,
    setDeleteSuccess,
    error,
    loadFailed,
    closeModals,
    handleCreateSubmit,
    handleEditSubmit,
    confirmDelete,
  };
};
