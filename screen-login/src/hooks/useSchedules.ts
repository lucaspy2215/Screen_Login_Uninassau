import { useCallback, useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

import { closedFormValues } from "@/lib/forms";
import {
  createSchedule,
  getSchedules,
  requestCancellation,
  updateSchedule,
} from "@/lib/schedules";
import { getTeachers } from "@/lib/teachers";
import type { Schedule } from "@/types/schedule";
import type { Teacher } from "@/types/teacher";

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
    loadTeachers();
  }, [loadSchedules, loadTeachers]);

  const filtered = schedules.filter((item) => {
    const searchTerm = search.trim().toLowerCase();

    const [year, month, day] = item.date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    const normalizedDate = `${day}${month}${year}`;
    const normalizedSearch = searchTerm.replace(/\D/g, "");

    const matchesTeacher = item.teacher.toLowerCase().includes(searchTerm);

    const matchesDate =
      item.date.includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      (normalizedSearch.length > 0 &&
        normalizedDate.includes(normalizedSearch));

    return matchesTeacher || matchesDate;
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

    void runAndRefresh(
      () => requestCancellation(deleting.id),
      () => setDeleteSuccess(true),
    );
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
