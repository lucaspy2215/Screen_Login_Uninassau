import { Fragment } from "react";

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const horary = [
  "18:30 às 19:20",
  "19:20 às 20:10",
  "20:10 às 21:00",
  "21:00 às 21:50",
];

type reservation = { text: string; type: "reservado" | "outro" };

// chave "linha-coluna": 0-1 = primeiro horário, terça
const reverse: Record<string, reservation> = {
  "0-1": { text: "Redes Prof. Danielly Gualberto", type: "reservado" },
  "0-3": { text: "EAD", type: "outro" },
  "3-2": { text: "Machine Learning Prof. Daniel Marques", type: "reservado" },
};

const colors = {
  reservado: "bg-[#244870] text-white",
  outro: "bg-[#5E8AB4] text-white",
};

export const AgendaTable = () => (
  <div className="grid grid-cols-6 border border-[#5E8AB4] text-center text-[10px] text-black">
    {["Horário", ...days].map((d) => (
      <div key={d} className="border p-1 font-semibold">
        {d}
      </div>
    ))}

    {horary.map((hora, linha) => (
      <Fragment key={hora}>
        <div className="border bg-[#DDF0FD] p-1 font-semibold">{hora}</div>
        {days.map((dia, coluna) => {
          const reload = reverse[`${linha}-${coluna}`];
          return (
            <div
              key={dia}
              className={`min-h-16 border p-1 ${reload ? colors[reload.type] : "bg-[#DDF0FD]"}`}
            >
              {reload?.text}
            </div>
          );
        })}
      </Fragment>
    ))}
  </div>
);