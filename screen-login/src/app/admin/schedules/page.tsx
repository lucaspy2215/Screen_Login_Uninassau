"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";
import { createSchedule, getSchedules, timeSlots, updateSchedule } from "@/lib/schedules";
import { Schedule } from "@/types/schedule";

const textFields = [
  { label: "Professor", name: "teacher" },
  { label: "Disciplina", name: "subject" },
  { label: "Curso", name: "course" },
];

const fieldClass = "mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] bg-white px-3 text-[#244870]";
const labelClass = "block font-semibold text-[#244870]";
const errorClass = "text-sm font-semibold text-[#D64045]";
const iconButtonClass = "h-9! w-9! p-0!";

const Nameinitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

// "2026-11-16" -> "16/11"
const formatDay = (date: string) =>
  date.split("-").reverse().slice(0, 2).join("/");

// "2026-11-16" -> "seg"
const weekdayName = (date: string) =>
  new Date(`${date}T00:00:00`)
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "");

export default function SchedulesPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);

  const loadSchedules = useCallback(
    () => getSchedules().then(setSchedules).catch(() => setLoadFailed(true)),
    [],
  );

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const filtered = schedules.filter((item) =>
    item.teacher.toLowerCase().includes(search.toLowerCase()),
  );

  const closeModals = () => {
    setOpen(false);
    setEditing(null);
    setError("");
  };

  const toSendFormCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await createSchedule(data);
      await loadSchedules();
      closeModals();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const toSendFormEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await updateSchedule(editing!.id, data);
      await loadSchedules();
      closeModals();
      setEdited(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-4 px-4">
        <button onClick={() => router.back()} className="w-fit text-[#244870]">
          <ChevronLeft />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#244870]">HORÁRIOS</h1>
          <Button
            colorsParam="navy"
            weight="600"
            iconLeft={<Plus size={20} />}
            className="w-32!"
            onClick={() => setOpen(true)}
          >
            Novo
          </Button>
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#AEBBCD] px-3 text-[#4E8BB8]">
          <Search size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou matrícula"
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
                {Nameinitials(item.teacher)}
              </span>
              <div className="flex-1 font-semibold text-[#4A6A91]">
                <p className="text-[#244870]">{item.teacher}</p>
                <p>Aula {formatDay(item.date)}</p>
                <p>{timeSlots[item.time_slot]}</p>
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
                <Button colorsParam="navy" weight="400" className={iconButtonClass}>
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={open} onClose={closeModals} closeButton>
        <form onSubmit={toSendFormCreate} className="flex flex-col gap-3">
          <h2 className="font-bold text-[#244870]">Criar reserva</h2>

          {textFields.map(({ label, name }) => (
            <label key={name} className={labelClass}>
              {label}
              <input name={name} required className={fieldClass} />
            </label>
          ))}

          <label className={labelClass}>
            Laboratório
            <select name="lab" className={fieldClass}>
              <option value="Lab 01">Laboratório 01</option>
              <option value="Lab 02">Laboratório 02</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className={labelClass}>
              Dia
              <input name="date" type="date" required className={fieldClass} />
            </label>
            <label className={labelClass}>
              Turno
              <select name="shift" className={fieldClass}>
                <option>Manhã</option>
                <option>Noite</option>
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Horário
            <select name="timeSlot" className={fieldClass}>
              {Object.entries(timeSlots).map(([slot, label]) => (
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
        <form onSubmit={toSendFormEdit} className="flex flex-col gap-3">
          <div>
            <h2 className="font-bold text-[#244870]">Editar Reserva</h2>
            <p className="text-[#4A6A91]">
              {editing?.lab} ·{" "}
              <span className="capitalize">{weekdayName(editing?.date ?? "")}</span> ·{" "}
              {timeSlots[editing?.time_slot ?? 1]}
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

      <Modal
        open={edited}
        onClose={() => setEdited(false)}
        closeButton
        title="EDIÇÃO CONCLUÍDA!"
        text="As alterações já estão visíveis no painel de reservas."
      />
    </div>
  );
}