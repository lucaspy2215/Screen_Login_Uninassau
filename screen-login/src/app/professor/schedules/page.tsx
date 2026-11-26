"use client";

import { ChevronLeft, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";
import { useSchedules } from "@/hooks/useSchedules";
import { formatDayMonth, formatInitials } from "@/lib/format";
import { timeSlots } from "@/lib/schedules";
import { Schedule } from "@/types/schedule";

const labs = [
  { value: "Lab 01", label: "Laboratório 01" },
  { value: "Lab 02", label: "Laboratório 02" },
];

const shifts = ["Manhã", "Noite"] as const;

const getTimeLabel = (shift: string, timeSlot: number) => {
  if (shift !== "Manhã" && shift !== "Noite") {
    return "Horário não identificado";
  }

  return timeSlots[shift][timeSlot] ?? "Horário não identificado";
};

export default function ProfessorSchedulesPage() {
  const router = useRouter();

  const [viewing, setViewing] = useState<Schedule | null>(null);
  const [selectedShift, setSelectedShift] =
    useState<keyof typeof timeSlots>("Manhã");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("1");

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const {
    filtered,
    search,
    setSearch,
    creating,
    setCreating,
    deleting,
    setDeleting,
    createSuccess,
    setCreateSuccess,
    deleteSuccess,
    setDeleteSuccess,
    error,
    loadFailed,
    closeModals,
    handleCreateSubmit,
    confirmDelete,
  } = useSchedules();

  const handleShiftChange = (shift: keyof typeof timeSlots) => {
    setSelectedShift(shift);
    setSelectedTimeSlot("1");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-4 px-4">
        <button onClick={() => router.back()} className="w-fit text-[#244870]">
          <ChevronLeft />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#244870]">
            MEUS <br /> HORÁRIOS
          </h1>

          <Button
            colorsParam="navy"
            weight="600"
            iconLeft={<Plus size={20} />}
            className="w-32!"
            onClick={() => setCreating(true)}
          >
            Novo
          </Button>
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#AEBBCD] px-3 text-[#4E8BB8]">
          <Search size={20} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome ou data"
            className="flex-1 bg-transparent font-semibold outline-none placeholder:text-[#8FA3BD]"
          />
        </label>

        {loadFailed && (
          <p className="text-sm font-semibold text-[#D64045]">
            Não foi possível carregar os horários.
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-[#AEBBCD] p-3"
            >
              <button
                type="button"
                onClick={() => setViewing(item)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                  {formatInitials(item.subject || item.teacher)}
                </span>

                <div className="min-w-0 flex-1 font-semibold text-[#244870]">
                  <p className="truncate">{item.subject}</p>
                  <p className="text-[#4A6A91]">
                    Aula {formatDayMonth(item.date)}
                  </p>
                  <p className="text-[#4A6A91]">
                    {getTimeLabel(item.shift, item.time_slot)}
                  </p>
                </div>
              </button>

              <Button
                colorsParam="navy"
                weight="400"
                className="h-9! w-9! p-0!"
                onClick={() => setDeleting(item)}
              >
                <Trash2 size={18} />
              </Button>
            </li>
          ))}
        </ul>

        {!loadFailed && filtered.length === 0 && (
          <p className="py-8 text-center font-semibold text-[#8FA3BD]">
            Nenhum horário encontrado.
          </p>
        )}
      </div>

      <Modal open={creating} onClose={closeModals} closeButton>
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
          <h2 className="text-center font-bold text-[#244870]">
            Solicitar reserva
          </h2>

          <label className="block font-semibold text-[#244870]">
            Professor
            <input
              name="teacher"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3"
            />
          </label>

          <label className="block font-semibold text-[#244870]">
            Disciplina
            <input
              name="subject"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3"
            />
          </label>

          <label className="block font-semibold text-[#244870]">
            Curso
            <input
              name="course"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3"
            />
          </label>

          <label className="block font-semibold text-[#244870]">
            Laboratório
            <select
              name="lab"
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3"
            >
              {labs.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block font-semibold text-[#244870]">
              Dia
              <input
                name="date"
                type="date"
                min={minDate}
                required
                className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-2"
              />
            </label>

            <label className="block font-semibold text-[#244870]">
              Turno
              <select
                name="shift"
                value={selectedShift}
                onChange={(event) =>
                  handleShiftChange(
                    event.target.value as keyof typeof timeSlots,
                  )
                }
                className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-2"
              >
                {shifts.map((shift) => (
                  <option key={shift} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block font-semibold text-[#244870]">
            Horário
            <select
              name="timeSlot"
              value={selectedTimeSlot}
              onChange={(event) => setSelectedTimeSlot(event.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3"
            >
              {Object.entries(timeSlots[selectedShift]).map(([slot, label]) => (
                <option key={slot} value={slot}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p className="text-sm font-semibold text-[#D64045]">{error}</p>
          )}

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              Solicitar
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} closeButton>
        <h2 className="text-center font-bold text-[#244870]">
          Visualizar Reserva
        </h2>

        <p className="mt-2 text-center font-semibold text-[#4A6A91]">
          {viewing && formatDayMonth(viewing.date)} · {viewing?.shift} ·{" "}
          {viewing && getTimeLabel(viewing.shift, viewing.time_slot)}
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <label className="font-semibold text-[#244870]">
            Disciplina
            <input
              value={viewing?.subject ?? ""}
              readOnly
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3 text-[#244870]"
            />
          </label>

          <label className="font-semibold text-[#244870]">
            Laboratório
            <input
              value={viewing?.lab ?? ""}
              readOnly
              className="mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] px-3 text-[#244870]"
            />
          </label>
        </div>

        {viewing?.status === "active" && (
          <div className="mt-5 flex justify-center">
            <Button
              size="small"
              colorsParam="danger"
              weight="600"
              onClick={() => {
                setDeleting(viewing);
                setViewing(null);
              }}
            >
              Cancelar reserva
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={closeModals}>
        <h2 className="text-center font-bold text-[#244870]">
          SOLICITAR CANCELAMENTO
        </h2>

        <p className="mt-2 text-center font-semibold text-[#4A6A91]">
          Tem certeza de que deseja solicitar o cancelamento desta reserva? O
          administrador precisará analisar sua solicitação.
        </p>

        {error && (
          <p className="mt-3 text-sm font-semibold text-[#D64045]">{error}</p>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            size="small"
            colorsParam="danger"
            weight="600"
            onClick={confirmDelete}
          >
            Solicitar Cancelamento 
          </Button>
        </div>
      </Modal>

      <Modal
        open={createSuccess}
        onClose={() => setCreateSuccess(false)}
        closeButton
      >
        <h2 className="text-center font-bold text-[#244870]">
          RESERVA SOLICITADA!
        </h2>
        <p className="mt-2 text-center font-semibold text-[#4A6A91]">
          Aguarde a resposta da coordenação.
        </p>
      </Modal>

      <Modal
        open={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
        closeButton
      >
        <h2 className="text-center font-bold text-[#244870]">
          SOLICITAÇÃO DE CANCELAMENTO
          <br />
          ENVIADA COM SUCESSO!
        </h2>
      </Modal>
    </div>
  );
}
