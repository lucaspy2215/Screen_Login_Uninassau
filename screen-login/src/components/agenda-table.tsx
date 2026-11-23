import { Fragment } from "react";
import { Schedule } from "@/types/schedule";

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const morningHorary = [
  "07:30 às 08:20",
  "08:20 às 09:10",
  "09:10 às 10:00",
  "10:20 às 11:10",
  "11:10 às 12:00",
];

const nightHorary = [
  "18:30 às 19:20",
  "19:20 às 20:10",
  "20:10 às 21:00",
  "21:00 às 21:50",
];

type AgendaTableProps = {
  shift: "Manhã" | "Noite";
  weekStart: Date;
  laboratory: string;
  reservations: Schedule[];
};

const formatDay = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

const formatISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const AgendaTable = ({
  shift,
  weekStart,
  laboratory,
  reservations,
}: AgendaTableProps) => {
  const horary = shift === "Manhã" ? morningHorary : nightHorary;

  const weekDays = days.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    return {
      day,
      date,
      dateKey: formatISODate(date),
    };
  });

  return (
    <div className="grid grid-cols-6 border border-[#5E8AB4] text-center text-[10px] text-black">
      <div className="flex items-center justify-center border p-1 font-semibold">
        Horário
      </div>

      {weekDays.map(({ day, date }) => (
        <div
          key={day}
          className="flex flex-col items-center justify-center border p-1 font-semibold"
        >
          <span>{formatDay(date)}</span>
          <span className="text-[9px] font-normal">{day}</span>
        </div>
      ))}

      {horary.map((hora, linha) => (
        <Fragment key={hora}>
          {shift === "Manhã" && linha === 3 && (
            <div className="col-span-6 border bg-[#F3E5C2] p-2 font-semibold text-[#76551A]">
              Intervalo — 10:00 às 10:20
            </div>
          )}

          <div className="border bg-[#DDF0FD] p-1 font-semibold">{hora}</div>

          {weekDays.map(({ day, dateKey }) => {
            const reservation = reservations.find(
              (item) =>
                item.date === dateKey &&
                item.shift === shift &&
                item.lab === laboratory &&
                item.time_slot === linha + 1 &&
                item.status === "active",
            );

            return (
              <div
                key={day}
                className={`min-h-16 border p-1 ${
                  reservation ? "bg-[#244870] text-white" : "bg-[#DDF0FD]"
                }`}
              >
                {reservation && (
                  <>
                    <p className="font-semibold">{reservation.subject}</p>
                    <p>{reservation.teacher}</p>
                  </>
                )}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
