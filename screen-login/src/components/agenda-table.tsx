import { Fragment } from "react";

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

type Reservation = {
  text: string;
  type: "reservado" | "outro";
};

const reverse: Record<string, Reservation> = {
  "0-1": { text: "Redes Prof. Danielly Gualberto", type: "reservado" },
  "0-3": { text: "EAD", type: "outro" },
  "3-2": { text: "Machine Learning Prof. Daniel Marques", type: "reservado" },
};

const colors = {
  reservado: "bg-[#244870] text-white",
  outro: "bg-[#5E8AB4] text-white",
};

type AgendaTableProps = {
  shift: "Manhã" | "Noite";
  weekStart: Date;
};

const formatDay = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

export const AgendaTable = ({ shift, weekStart }: AgendaTableProps) => {
  const horary = shift === "Manhã" ? morningHorary : nightHorary;

  return (
    <div className="grid grid-cols-6 border border-[#5E8AB4] text-center text-[10px] text-black">
      <div className="flex items-center justify-center border p-1 font-semibold">
        Horário
      </div>

      {days.map((day, index) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + index);

        return (
          <div
            key={day}
            className="flex flex-col items-center justify-center border p-1 font-semibold"
          >
            <span>{formatDay(date)}</span>
            <span className="text-[9px] font-normal">{day}</span>
          </div>
        );
      })}

      {horary.map((hora, linha) => (
        <Fragment key={hora}>
          {shift === "Manhã" && linha === 3 && (
            <div className="col-span-6 border bg-[#F3E5C2] p-2 font-semibold text-[#76551A]">
              Intervalo — 10:00 às 10:20
            </div>
          )}

          <div className="border bg-[#DDF0FD] p-1 font-semibold">{hora}</div>

          {days.map((day, coluna) => {
            const reservation = reverse[`${linha}-${coluna}`];

            return (
              <div
                key={day}
                className={`min-h-16 border p-1 ${
                  reservation ? colors[reservation.type] : "bg-[#DDF0FD]"
                }`}
              >
                {reservation?.text}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
