"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";
import {
  approveSchedule,
  getSchedules,
  rejectSchedule,
  timeSlots,
} from "@/lib/schedules";
import { Schedule } from "@/types/schedule";

type Shift = "Manhã" | "Noite";
type Confirmation = "approve" | "reject";
type Success = "approved" | "rejected";

const shifts: Shift[] = ["Manhã", "Noite"];

const nameInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatDate = (date: string) => {
  const [, month, day] = date.split("T")[0].split("-");
  return `${day}/${month}`;
};

const getTimeSlot = (item: Schedule) =>
  timeSlots[item.shift as Shift]?.[item.time_slot] ??
  `Horário ${item.time_slot}`;

export default function RequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<Schedule[]>([]);
  const [shift, setShift] = useState<Shift>("Noite");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Schedule | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadRequests = useCallback(async () => {
    try {
      setError("");

      const data = await getSchedules();

      setRequests(data.filter((item) => item.status === "pending"));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as solicitações.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filtered = requests.filter(
    (item) =>
      item.shift === shift &&
      `${item.teacher} ${item.subject} ${item.course} ${item.lab}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const handleDecision = async () => {
    if (!selected || !confirmation || saving) return;

    try {
      setSaving(true);
      setError("");

      if (confirmation === "approve") {
        await approveSchedule(selected.id);
      } else {
        await rejectSchedule(selected.id);
      }

      setRequests((current) =>
        current.filter((item) => item.id !== selected.id),
      );

      setSuccess(confirmation === "approve" ? "approved" : "rejected");

      setSelected(null);
      setConfirmation(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a solicitação.",
      );
    } finally {
      setSaving(false);
    }
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
              onChange={(event) => setShift(event.target.value as Shift)}
              className="mt-1 block h-10 w-36 rounded-lg bg-[#244870] px-3 text-white"
            >
              {shifts.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#AEBBCD] px-3 text-[#4E8BB8]">
          <Search size={20} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por professor, disciplina ou curso"
            className="flex-1 bg-transparent font-semibold outline-none placeholder:text-[#8FA3BD]"
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-6 text-center font-semibold text-[#4A6A91]">
            Carregando solicitações...
          </p>
        ) : filtered.length === 0 ? (
          <p className="py-6 text-center font-semibold text-[#4A6A91]">
            Nenhuma solicitação pendente encontrada.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                onClick={() => setSelected(item)}
                className="flex cursor-pointer items-center gap-4 rounded-2xl bg-[#AEBBCD] p-3"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                  {nameInitials(item.teacher)}
                </span>

                <div className="min-w-0 font-semibold text-[#4A6A91]">
                  <p className="truncate">
                    {item.teacher} - {item.lab}
                  </p>

                  <p>
                    Aula {formatDate(item.date)} - {getTimeSlot(item)}
                  </p>

                  <p className="truncate text-sm">{item.subject}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={!!selected && !confirmation}
        onClose={() => setSelected(null)}
      >
        <h2 className="font-bold text-[#4A6A91]">DETALHES DA SOLICITAÇÃO</h2>

        <div className="mt-4 space-y-2 font-semibold text-[#244870]">
          <p>Professor: {selected?.teacher}</p>
          <p>Disciplina: {selected?.subject}</p>
          <p>Curso: {selected?.course}</p>
          <p>Laboratório: {selected?.lab}</p>
          <p>Data: {selected ? formatDate(selected.date) : ""}</p>
          <p>Turno: {selected?.shift}</p>
          <p>Horário: {selected ? getTimeSlot(selected) : ""}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="navy"
              weight="600"
              onClick={() => setConfirmation("approve")}
            >
              Aceitar
            </Button>
          </div>

          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="danger"
              weight="600"
              onClick={() => setConfirmation("reject")}
            >
              Recusar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!confirmation}
        onClose={() => !saving && setConfirmation(null)}
      >
        <h2 className="text-center font-bold text-[#244870]">
          {confirmation === "approve"
            ? "CONFIRMAR APROVAÇÃO?"
            : "CONFIRMAR RECUSA?"}
        </h2>

        <p className="mt-3 text-center font-semibold text-[#4A6A91]">
          {confirmation === "approve"
            ? "Deseja realmente aprovar esta solicitação?"
            : "Deseja realmente recusar esta solicitação?"}
        </p>

        <div
          className={`mt-6 flex gap-3 ${
            confirmation === "reject" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="navy"
              weight="600"
              onClick={handleDecision}
              disabled={saving}
            >
              {saving ? "Aguarde..." : "Confirmar"}
            </Button>
          </div>

          <div className="flex-1 [&>button]:w-full!">
            <Button
              size="small"
              colorsParam="danger"
              weight="600"
              onClick={() => setConfirmation(null)}
              disabled={saving}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!success}
        onClose={() => setSuccess(null)}
        closeButton
        title={
          success === "approved"
            ? "SOLICITAÇÃO APROVADA!"
            : "SOLICITAÇÃO RECUSADA!"
        }
        text={
          success === "approved"
            ? "O horário foi aprovado e já pode aparecer na agenda pública."
            : "A solicitação foi recusada com sucesso."
        }
      />
    </div>
  );
}
