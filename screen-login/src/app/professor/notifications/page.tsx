"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  Ban,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { getSchedules } from "@/lib/schedules";
import { formatDayMonth } from "@/lib/format";
import { timeSlots } from "@/lib/schedules";
import type { Schedule } from "@/types/schedule";

const statusDetails: Record<
  Schedule["status"],
  {
    label: string;
    description: string;
    icon: LucideIcon;
    color: string;
  }
> = {
  pending: {
    label: "Aguardando aprovação",
    description: "Sua solicitação está aguardando análise do administrador.",
    icon: Clock3,
    color: "text-amber-600 bg-amber-50",
  },
  active: {
    label: "Reserva aprovada",
    description: "Sua solicitação foi aceita pelo administrador.",
    icon: CheckCircle2,
    color: "text-green-700 bg-green-50",
  },
  rejected: {
    label: "Reserva recusada",
    description: "Sua solicitação não foi aprovada pelo administrador.",
    icon: XCircle,
    color: "text-red-600 bg-red-50",
  },
  cancellation_requested: {
    label: "Cancelamento solicitado",
    description: "Seu pedido de cancelamento está aguardando análise.",
    icon: Clock3,
    color: "text-amber-600 bg-amber-50",
  },
  completed: {
    label: "Reserva concluída",
    description: "Esta reserva foi marcada como concluída.",
    icon: CalendarCheck,
    color: "text-blue-700 bg-blue-50",
  },
  cancelled: {
    label: "Reserva cancelada",
    description: "Esta reserva foi cancelada.",
    icon: Ban,
    color: "text-gray-600 bg-gray-100",
  },
};

const getTimeLabel = (shift: string, timeSlot: number) => {
  if (shift !== "Manhã" && shift !== "Noite") {
    return "Horário não identificado";
  }

  return timeSlots[shift][timeSlot] ?? "Horário não identificado";
};

export default function ProfessorNotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getSchedules();
      setNotifications(data);
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-5 px-4 pb-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-fit text-[#244870]"
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center gap-3">
          <Bell size={28} className="text-[#244870]" />

          <div>
            <h1 className="text-2xl font-bold text-[#244870]">NOTIFICAÇÕES</h1>
            <p className="text-sm text-[#8FA3BD]">
              Acompanhe suas solicitações de reserva.
            </p>
          </div>
        </div>

        {loading && (
          <p className="py-8 text-center font-semibold text-[#8FA3BD]">
            Carregando notificações...
          </p>
        )}

        {loadFailed && (
          <div className="rounded-xl bg-red-50 p-4 text-center">
            <p className="font-semibold text-red-600">
              Não foi possível carregar as notificações.
            </p>

            <button
              type="button"
              onClick={loadNotifications}
              className="mt-3 font-semibold text-[#244870] underline"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !loadFailed && notifications.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#F2F6FA] px-5 py-10 text-center">
            <Bell size={36} className="text-[#8FA3BD]" />

            <p className="font-bold text-[#244870]">Nenhuma notificação</p>

            <p className="text-sm text-[#8FA3BD]">
              Quando você solicitar uma reserva, poderá acompanhar a situação
              por aqui.
            </p>
          </div>
        )}

        {!loading && !loadFailed && notifications.length > 0 && (
          <ul className="flex flex-col gap-3">
            {notifications.map((item) => {
              const details = statusDetails[item.status];
              const Icon = details.icon;

              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-[#DCE4ED] bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${details.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#244870]">
                        {details.label}
                      </p>

                      <p className="mt-1 text-sm text-[#4A6A91]">
                        {details.description}
                      </p>

                      <div className="mt-3 rounded-lg bg-[#F2F6FA] p-3 text-sm text-[#4A6A91]">
                        <p className="font-semibold text-[#244870]">
                          {item.subject}
                        </p>

                        <p>{item.lab}</p>

                        <p>Aula: {formatDayMonth(item.date)}</p>

                        <p>
                          {item.shift} ·{" "}
                          {getTimeLabel(item.shift, item.time_slot)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
