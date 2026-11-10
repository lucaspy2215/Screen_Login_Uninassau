"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AgendaTable } from "@/components/agenda-table";

const filtros = [
  { label: "Laboratório", opcoes: ["Lab 01", "Lab 02"] },
  { label: "Turno", opcoes: ["Manhã", "Tarde", "Noite"] },
];

const formatar = (d: Date) =>
  d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

export default function AgendaPage() {
  const [semana, setSemana] = useState(1);

  const inicio = new Date(2026, 7, 10 + (semana - 1) * 7); // segunda da semana 1
  const fim = new Date(inicio);
  fim.setDate(inicio.getDate() + 4);

  const navBtn = "flex h-12 w-14 items-center justify-center rounded-lg bg-[#244870] text-white disabled:opacity-40";

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full max-w-md flex-1 flex-col gap-6 px-4 pt-16">
        <div className="flex gap-4">
          {filtros.map(({ label, opcoes }) => (
            <label key={label} className="flex-1 font-semibold text-[#244870]">
              {label}
              <select className="mt-1 h-10 w-full rounded-lg bg-[#244870] px-3 text-white">
                {opcoes.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#EAF4FF]">
          <button className={navBtn} disabled={semana === 1} onClick={() => setSemana(semana - 1)}>
            <ChevronLeft />
          </button>
          <p className="text-center text-xl font-bold text-[#244870]">
            Semana {String(semana).padStart(2, "0")} <br />
            {formatar(inicio)} à {formatar(fim)}
          </p>
          <button className={navBtn} onClick={() => setSemana(semana + 1)}>
            <ChevronRight />
          </button>
        </div>

        <AgendaTable />

        <div className="flex justify-around text-xs font-semibold text-[#4E8BB8]">
          <span>▢ Disponível</span>
          <span className="text-[#244870]">■ Reservado</span>
          <span>■ Outro curso</span>
        </div>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">AGENDAMENTO LAB.</h3>
    </div>
  );
}