"use client";

import { useState } from "react";
import { ChevronLeft, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";
import { useSchedules } from "@/hooks/useSchedules";
import { formatDayMonth, formatInitials, formatWeekday } from "@/lib/format";
import { timeSlots } from "@/lib/schedules";

const textFields = [
  { label: "Disciplina", name: "subject" },
  { label: "Curso", name: "course" },
] as const;

const labs = [
  { value: "Lab 01", label: "Laboratório 01" },
  { value: "Lab 02", label: "Laboratório 02" },
];

const shifts = ["Manhã", "Noite"] as const;

type Shift = (typeof shifts)[number];

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] bg-white px-3 text-[#244870]";

const labelClass = "block font-semibold text-[#244870]";
const errorClass = "text-sm font-semibold text-[#D64045]";
const iconButtonClass = "h-9! w-9! p-0!";

const getTimeLabel = (shift: string, timeSlot: number) => {
  if (shift !== "Manhã" && shift !== "Noite") {
    return "Horário não identificado";
  }

  return timeSlots[shift][timeSlot] ?? "Horário não identificado";
};

export default function SchedulesPage() {
  const router = useRouter();

  const {
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
    error,
    loadFailed,
    closeModals,
    handleCreateSubmit,
    handleEditSubmit,
    confirmDelete,
  } = useSchedules();

  const [selectedShift, setSelectedShift] = useState<Shift>("Manhã");

  const canCreate =
    !teachersLoading && !teacherLoadFailed && teachers.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-4 px-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-fit text-[#244870]"
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#244870]">HORÁRIOS</h1>

          <Button
            colorsParam="navy"
            weight="600"
            iconLeft={<Plus size={20} />}
            className="w-32!"
            onClick={() => {
              setSelectedShift("Manhã");
              setCreating(true);
            }}
          >
            Novo
          </Button>
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#AEBBCD] px-3 text-[#4E8BB8]">
          <Search size={20} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou número de registro"
            className="flex-1 bg-transparent font-semibold outline-none placeholder:text-[#8FA3BD]"
          />
        </label>

        {loadFailed && (
          <p className={errorClass}>
            Não foi possível carregar os horários. A API está rodando?
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-[#AEBBCD] p-3"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                {formatInitials(item.teacher)}
              </span>

              <div className="flex-1 font-semibold text-[#4A6A91]">
                <p className="text-[#244870]">{item.teacher}</p>
                <p>Aula {formatDayMonth(item.date)}</p>
                <p>{getTimeLabel(item.shift, item.time_slot)}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  colorsParam="navy"
                  weight="400"
                  className={iconButtonClass}
                  onClick={() => setEditing(item)}
                >
                  <SquarePen size={18} />
                </Button>

                <Button
                  colorsParam="navy"
                  weight="400"
                  className={iconButtonClass}
                  onClick={() => setDeleting(item)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={creating} onClose={closeModals} closeButton>
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
          <h2 className="font-bold text-[#244870]">Criar reserva</h2>

          <label className={labelClass}>
            Professor
            <select
              name="teacherId"
              required
              disabled={!canCreate}
              className={fieldClass}
              defaultValue=""
            >
              <option value="" disabled>
                {teachersLoading
                  ? "Carregando professores..."
                  : teacherLoadFailed
                    ? "Erro ao carregar professores"
                    : teachers.length === 0
                      ? "Nenhum professor ativo encontrado"
                      : "Selecione um professor"}
              </option>

              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </label>

          {teacherLoadFailed && (
            <p className={errorClass}>
              Não foi possível carregar os professores.
            </p>
          )}

          {!teachersLoading && !teacherLoadFailed && teachers.length === 0 && (
            <p className={errorClass}>
              Não existem professores ativos disponíveis.
            </p>
          )}

          {textFields.map(({ label, name }) => (
            <label key={name} className={labelClass}>
              {label}

              <input name={name} required className={fieldClass} />
            </label>
          ))}

          <label className={labelClass}>
            Laboratório
            <select name="lab" required className={fieldClass} defaultValue="">
              <option value="" disabled>
                Selecione um laboratório
              </option>

              {labs.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Dia
              <input name="date" type="date" required className={fieldClass} />
            </label>

            <label className={labelClass}>
              Turno
              <select
                name="shift"
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value as Shift)}
                className={fieldClass}
              >
                {shifts.map((shift) => (
                  <option key={shift} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Horário
            <select name="timeSlot" required className={fieldClass}>
              {Object.entries(timeSlots[selectedShift]).map(([slot, label]) => (
                <option key={slot} value={slot}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          {error && <p className={errorClass}>{error}</p>}

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              Criar
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!editing} onClose={closeModals} closeButton>
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-[#244870]">Editar Reserva</h2>

            <p className="text-[#4A6A91]">
              {editing?.lab} ·{" "}
              <span className="capitalize">
                {formatWeekday(editing?.date ?? "")}
              </span>{" "}
              · {editing && getTimeLabel(editing.shift, editing.time_slot)}
            </p>
          </div>

          <label className={labelClass}>
            Professor
            <input
              name="teacher"
              defaultValue={editing?.teacher}
              required
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Disciplina
            <input
              name="subject"
              defaultValue={editing?.subject}
              required
              className={fieldClass}
            />
          </label>

          {error && <p className={errorClass}>{error}</p>}

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              Editar
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleting} onClose={closeModals}>
        <h2 className="font-bold text-[#244870]">EXCLUIR RESERVA?</h2>

        <p className="mt-2 font-semibold text-[#4A6A91]">
          {deleting?.teacher} · {deleting && formatDayMonth(deleting.date)} ·{" "}
          {deleting && getTimeLabel(deleting.shift, deleting.time_slot)}
        </p>

        {error && <p className={errorClass}>{error}</p>}

        <div className="mt-6 flex gap-3">
          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="danger"
              weight="600"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </div>

          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="navy"
              weight="600"
              onClick={closeModals}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={editSuccess}
        onClose={() => setEditSuccess(false)}
        closeButton
        title="EDIÇÃO CONCLUÍDA!"
        text="As alterações já estão visíveis no painel de reservas."
      />
    </div>
  );
}
