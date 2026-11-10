import { Fragment } from "react";

const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const horarios = ["18:30 às 19:20", "19:20 às 20:10", "20:10 às 21:00", "21:00 às 21:50"];

type Reserva = { texto: string; tipo: "reservado" | "outro" };

// chave "linha-coluna": 0-1 = primeiro horário, terça
const reservas: Record<string, Reserva> = {
  "0-1": { texto: "Redes Prof. Danielly Gualberto", tipo: "reservado" },
  "0-3": { texto: "EAD", tipo: "outro" },
  "3-2": { texto: "Machine Learning Prof. Daniel Marques", tipo: "reservado" },
};

const cores = {
  reservado: "bg-[#244870] text-white",
  outro: "bg-[#5E8AB4] text-white",
};

export const AgendaTable = () => (
  <div className="grid grid-cols-6 border border-[#5E8AB4] text-center text-[10px] text-black">
    {["Horário", ...dias].map((d) => (
      <div key={d} className="border p-1 font-semibold">{d}</div>
    ))}

    {horarios.map((hora, linha) => (
      <Fragment key={hora}>
        <div className="border bg-[#DDF0FD] p-1 font-semibold">{hora}</div>
        {dias.map((dia, coluna) => {
          const r = reservas[`${linha}-${coluna}`];
          return (
            <div
              key={dia}
              className={`min-h-16 border p-1 ${r ? cores[r.tipo] : "bg-[#DDF0FD]"}`}
            >
              {r?.texto}
            </div>
          );
        })}
      </Fragment>
    ))}
  </div>
);