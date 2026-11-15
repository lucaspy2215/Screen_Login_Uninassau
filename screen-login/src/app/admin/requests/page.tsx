"use client";

import { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/modal";
import { Button } from "@/components/buttons";

// TODO: replace fixed data with API call
const requests = [
  { id: 1, name: "Ana Maria", registration: "20230001", lab: "Lab 01", date: "12/10", time: "19:20 à 20:10", shift: "Noite", reason: "Uso da ferramenta Drawio para realização de atividade em sala" },
  { id: 2, name: "Jorge Vercillo", registration: "20230002", lab: "Lab 01", date: "18/10", time: "18:30 à 19:20", shift: "Noite", reason: "Aula de reposição de Banco de Dados" },
  { id: 3, name: "Erika Araújo", registration: "20230003", lab: "Lab 02", date: "20/10", time: "21:00 à 21:50", shift: "Noite", reason: "Prova prática de Programação Web" },
  { id: 4, name: "Joaquim Lopes", registration: "20230004", lab: "Lab 01", date: "28/10", time: "20:10 à 21:00", shift: "Noite", reason: "Instalação de software para a disciplina de Redes" },
  { id: 5, name: "Mark Zuckerberg", registration: "20230005", lab: "Lab 02", date: "01/11", time: "19:20 à 20:10", shift: "Noite", reason: "Apresentação de projeto final" },
];

const horaryDay = ["Manhã", "Noite"];

const Namenitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

export default function RequestsPage() {
  const router = useRouter();
  const [shift, setShift] = useState("Noite");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof requests)[number] | null>(null);
  const [approved, setApproved] = useState(false);

  const filtered = requests.filter(
    (item) =>
      item.shift === shift &&
      `${item.name} ${item.registration}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const apiAccept = () => {
    // TODO: call API to approve the request
    setSelected(null);
    setApproved(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-4 px-4">
        <button onClick={() => router.back()} className="w-fit text-[#244870]">
          <ChevronLeft />
        </button>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#244870]">SOLICITAÇÕES</h1>
            <p className="font-semibold text-[#4E8BB8]">
              {filtered.length}{" "}
              {filtered.length === 1 ? "Solicitação" : "Solicitações"}
            </p>
          </div>

          <label className="font-semibold text-[#244870]">
            Turno
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="mt-1 block h-10 w-36 rounded-lg bg-[#244870] px-3 text-white"
            >
              {horaryDay.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
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
              onClick={() => setSelected(item)}
              className="flex cursor-pointer items-center gap-4 rounded-2xl bg-[#AEBBCD] p-3"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                {Namenitials(item.name)}
              </span>
              <div className="font-semibold text-[#4A6A91]">
                <p>
                  {item.name} - {item.lab}
                </p>
                <p>
                  Aula {item.date} - {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <h2 className="font-bold text-[#4A6A91]">MOTIVO DA SOLICITAÇÃO</h2>
        <p className="mt-4 font-bold text-[#244870]">{selected?.reason}</p>
        <div className="mt-6 flex gap-3">
          <div className="flex-1 [&>button]:w-full!">
            <Button size="small" colorsParam="navy" weight="600" onClick={apiAccept}>
              Aceitar
            </Button>
          </div>
          <div className="flex-1 [&>button]:w-full!">
            <Button size="small" colorsParam="danger" weight="600" onClick={() => setSelected(null)}>
              Recusar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={approved}
        onClose={() => setApproved(false)}
        closeButton
        title="SOLICITAÇÃO APROVADA!"
        text="O novo horário já está visível no painel de reservas."
      />
    </div>
  );
}