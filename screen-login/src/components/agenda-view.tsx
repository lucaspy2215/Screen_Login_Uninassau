"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AgendaTable } from "@/components/agenda-table";
import { getSchedules } from "@/lib/schedules";
import { Schedule } from "@/types/schedule";

const filters = [
  { label: "Laboratório", options: ["Lab 01", "Lab 02"] },
  { label: "Turno", options: ["Manhã", "Noite"] },
];

const legend = [
  { text: "Disponível", color: "bg-[#DDF0FD]" },
  { text: "Reservado", color: "bg-[#244870]" },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const getMonday = (date: Date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  monday.setDate(monday.getDate() + difference);
  monday.setHours(0, 0, 0, 0);

  return monday;
};

export const AgendaView = () => {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));

  const [laboratory, setLaboratory] = useState("Lab 01");
  const [shift, setShift] = useState<"Manhã" | "Noite">("Manhã");

  const [reservations, setReservations] = useState<Schedule[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    getSchedules()
      .then((data) => {
        setReservations(data);
        setLoadFailed(false);
      })
      .catch(() => {
        setLoadFailed(true);
      });
  }, []);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);

  const changeWeek = (amount: number) => {
    setWeekStart((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + amount * 7);
      return next;
    });
  };

  const navButton =
    "flex h-12 w-14 items-center justify-center rounded-lg bg-[#244870] text-white";

  return (
    <div className="flex w-full max-w-md flex-col gap-6 px-4">
      <div className="flex gap-4">
        {filters.map(({ label, options }) => (
          <label key={label} className="flex-1 font-semibold text-[#244870]">
            {label}

            <select
              value={label === "Laboratório" ? laboratory : shift}
              onChange={(event) => {
                if (label === "Laboratório") {
                  setLaboratory(event.target.value);
                } else {
                  setShift(event.target.value as "Manhã" | "Noite");
                }
              }}
              className="mt-1 h-10 w-full rounded-lg bg-[#244870] px-3 text-white"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {loadFailed && (
        <p className="text-sm font-semibold text-[#D64045]">
          Não foi possível carregar as reservas da agenda.
        </p>
      )}

      <div className="flex items-center justify-between rounded-xl bg-[#EAF4FF]">
        <button
          className={navButton}
          onClick={() => changeWeek(-1)}
          aria-label="Semana anterior"
        >
          <ChevronLeft />
        </button>

        <div className="text-center">
          <p className="text-lg font-bold text-[#244870]">
            {formatDate(weekStart)}
          </p>
          <p className="text-sm font-semibold text-[#244870]">
            até {formatDate(weekEnd)}
          </p>
        </div>

        <button
          className={navButton}
          onClick={() => changeWeek(1)}
          aria-label="Próxima semana"
        >
          <ChevronRight />
        </button>
      </div>

      <AgendaTable
        shift={shift}
        weekStart={weekStart}
        laboratory={laboratory}
        reservations={reservations}
      />

      <div className="flex justify-around text-xs font-semibold text-[#4E8BB8]">
        {legend.map(({ text, color }) => (
          <span key={text} className="flex items-center gap-1">
            <span className={`h-4 w-4 shrink-0 border border-black ${color}`} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
