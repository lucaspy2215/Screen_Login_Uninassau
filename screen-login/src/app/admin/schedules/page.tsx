"use client";

import { useState } from "react";
import { ChevronLeft, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";

// TODO: replace fixed data with API call
const schedules = [
  { id: 1, name: "Ana Maria", date: "12/10", time: "19:20 à 20:10" },
  { id: 2, name: "Jorge Vercillo", date: "18/10", time: "18:30 à 19:20" },
  { id: 3, name: "Erika Araújo", date: "20/10", time: "21:00 à 21:50" },
  { id: 4, name: "Joaquim Lopes", date: "28/10", time: "20:10 à 21:00" },
  { id: 5, name: "Mark Zuckerberg", date: "01/11", time: "19:20 à 20:10" },
];

const textFields = [
  { label: "Professor", name: "teacher" },
  { label: "Disciplina", name: "subject" },
  { label: "Curso", name: "course" },
];

const fieldClass =
  "mt-1 h-10 w-full rounded-lg border border-[#AEBBCD] bg-white px-3 text-[#244870]";
const labelClass = "block font-semibold text-[#244870]";
const iconButtonClass = "h-9! w-9! p-0!";

const Nameinitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

export default function SchedulesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = schedules.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: send data to API
    console.log(date);
    setOpen(false);
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

        <ul className="flex flex-col gap-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-[#AEBBCD] p-3"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                {Nameinitials(item.name)}
              </span>
              <div className="flex-1 font-semibold text-[#4A6A91]">
                <p className="text-[#244870]">{item.name}</p>
                <p>Aula {item.date}</p>
                <p>{item.time}</p>
              </div>
              <div className="flex gap-2">
                <Button colorsParam="navy" weight="400" className={iconButtonClass}>
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

      <Modal open={open} onClose={() => setOpen(false)} closeButton>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
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
              <option>Laboratório 01</option>
              <option>Laboratório 02</option>
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

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              Criar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}