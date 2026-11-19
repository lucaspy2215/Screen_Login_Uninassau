import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { closedFormValues } from "@/lib/forms";
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
  updateSchedule,
} from "@/lib/schedules";
import { Schedule } from "@/types/schedule";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [deleting, setDeleting] = useState<Schedule | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const loadSchedules = useCallback(
    () =>
      getSchedules()
        .then((data) => {
          setSchedules(data);
          setLoadFailed(false);
        })
        .catch(() => setLoadFailed(true)),
    [],
  );

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const filtered = schedules.filter((item) =>
    item.teacher.toLowerCase().includes(search.toLowerCase()),
  );

  const closeModals = () => {
    setCreating(false);
    setEditing(null);
    setDeleting(null);
    setError("");
  };

  // calls the API, reloads the list and closes the modals; on failure shows the error inside the modal
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
    const data = closedFormValues(e);
    runAndRefresh(
      () => createSchedule(data),
      () => setCreateSuccess(true),
    );
  };

  const handleEditSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const data = closedFormValues(e);
    runAndRefresh(
      () => updateSchedule(editing!.id, data),
      () => setEditSuccess(true),
    );
  };

  const confirmDelete = () =>
    runAndRefresh(
      () => deleteSchedule(deleting!.id),
      () => setDeleteSuccess(true),
    );

  return {
    filtered,
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