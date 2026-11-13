"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AgendaTable } from "@/components/agenda-table";

const filters = [
  { label: "Laboratório", options: ["Lab 01", "Lab 02"] },
  { label: "Turno", options: ["Manhã", "Noite"] },
];

const legend = [
  { text: "Disponível", color: "bg-[#DDF0FD]" },
  { text: "Reservado", color: "bg-[#244870]" },
  { text: "Outro curso", color: "bg-[#5E8AB4]" },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

export const AgendaView = () => {
  const [week, setWeek] = useState(1);

  const start = new Date(2026, 7, 10 + (week - 1) * 7); // monday of week 1
  const end = new Date(start);
  end.setDate(start.getDate() + 4);

  const navButton =
    "flex h-12 w-14 items-center justify-center rounded-lg bg-[#244870] text-white disabled:opacity-40";

  return (
    <div className="flex w-full max-w-md flex-col gap-6 px-4">
      <div className="flex gap-4">
        {filters.map(({ label, options }) => (
          <label key={label} className="flex-1 font-semibold text-[#244870]">
            {label}
            <select className="mt-1 h-10 w-full rounded-lg bg-[#244870] px-3 text-white">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-[#EAF4FF]">
        <button
          className={navButton}
          disabled={week === 1}
          onClick={() => setWeek(week - 1)}
        >
          <ChevronLeft />
        </button>
        <p className="text-center text-xl font-bold text-[#244870]">
          Semana {String(week).padStart(2, "0")} <br />
          {formatDate(start)} à {formatDate(end)}
        </p>
        <button className={navButton} onClick={() => setWeek(week + 1)}>
          <ChevronRight />
        </button>
      </div>

      <AgendaTable />

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