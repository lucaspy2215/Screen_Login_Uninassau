import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { closedFormValues } from "@/lib/forms";
import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  updateTeacher,
} from "@/lib/teachers";
import { Teacher } from "@/types/teacher";

export type Feedback = "created" | "edited";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [deleting, setDeleting] = useState<Teacher | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const loadTeachers = useCallback(
    () =>
      getTeachers()
        .then((data) => {
          setTeachers(data);
          setLoadFailed(false);
        })
        .catch(() => setLoadFailed(true)),
    [],
  );

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const filtered = teachers.filter((teacher) =>
    `${teacher.name} ${teacher.registration_number}`
      .toLowerCase()
      .includes(search.toLowerCase()),
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
    successFeedback?: Feedback,
  ) => {
    try {
      await action();
      await loadTeachers();
      closeModals();
      if (successFeedback) setFeedback(successFeedback);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // the same form is used to add and to edit
  const addAndEditSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    const data = closedFormValues(e);
    if (editing) {
      runAndRefresh(() => updateTeacher(editing.id, data), "edited");
    } else {
      runAndRefresh(() => createTeacher(data), "created");
    }
  };

  const confirmDelete = () => runAndRefresh(() => deleteTeacher(deleting!.id));

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
    feedback,
    setFeedback,
    error,
    loadFailed,
    closeModals,
    addAndEditSubmitForm,
    confirmDelete,
  };
};
