"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Search, FileDown, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

import { getReport } from "@/lib/reports";
import { ReportFilters, ReportGroup, ReportResponse } from "@/types/report";

type Shift = "Manhã" | "Noite";

const getDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getInitialFilters = (): ReportFilters => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 6, 1);

  return {
    startDate: getDate(start),
    endDate: getDate(today),
  };
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const formatMonth = (month: string) => {
  const [year, number] = month.split("-");
  const date = new Date(Number(year), Number(number) - 1);

  return date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
};

function IndicatorCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-[#244870] p-5 text-white shadow-sm">
      <p className="text-sm font-semibold text-blue-100">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-blue-100">{description}</p>
    </div>
  );
}

function BarList({
  title,
  data,
  formatLabel,
}: {
  title: string;
  data: ReportGroup[];
  formatLabel?: (value: string) => string;
}) {
  const maximum = Math.max(...data.map((item) => item.total), 1);

  return (
    <section className="rounded-2xl border border-[#D9E1EA] bg-white p-5 shadow-sm">
      <h2 className="mb-5 font-bold text-[#244870]">{title}</h2>

      {data.length === 0 ? (
        <p className="py-4 text-sm text-[#8FA3BD]">Nenhum dado disponível.</p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex justify-between gap-3 text-sm font-semibold text-[#4A6A91]">
                <span className="truncate">
                  {formatLabel ? formatLabel(item.name) : item.name}
                </span>
                <span>{item.total}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#E8EDF3]">
                <div
                  className="h-full rounded-full bg-[#4E8BB8]"
                  style={{
                    width: `${(item.total / maximum) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ReportPage() {
  const router = useRouter();

  const [filters, setFilters] = useState<ReportFilters>(getInitialFilters);
  const [search, setSearch] = useState("");
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReport = useCallback(async (currentFilters: ReportFilters) => {
    try {
      setLoading(true);
      setError("");

      const data = await getReport(currentFilters);
      setReport(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os relatórios.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReport(filters);
  }, [loadReport, filters]);

  const updateFilter = (key: keyof ReportFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value || undefined,
    }));
  };

  const reservations = (report?.reservations ?? []).filter((item) =>
    `${item.teacher} ${item.subject} ${item.course} ${item.lab}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const exportCSV = () => {
    if (!report) return;

    const headers = [
      "Professor",
      "Disciplina",
      "Curso",
      "Laboratório",
      "Data",
      "Turno",
      "Horário",
      "Status",
    ];

    const rows = report.reservations.map((item) => [
      item.teacher,
      item.subject,
      item.course,
      item.lab,
      formatDate(item.date),
      item.shift,
      item.time_slot,
      item.status,
    ]);

    const content = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";"),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + content], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "relatorio-lab-agenda.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const highestMonth = report?.indicators.highestMonth;
  const mostUsedTimeSlot = report?.indicators.mostUsedTimeSlot;

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <button
          onClick={() => router.back()}
          className="flex w-fit items-center gap-1 font-semibold text-[#244870]"
        >
          <ChevronLeft size={22} />
          Voltar
        </button>

        <header>
          <h1 className="text-3xl font-bold text-[#244870]">RELATÓRIOS</h1>
          <p className="mt-2 font-semibold text-[#4E8BB8]">
            Acompanhamento da utilização dos laboratórios
          </p>
        </header>

        <section className="rounded-2xl border border-[#D9E1EA] p-5">
          <h2 className="mb-4 font-bold text-[#244870]">Filtros</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Data inicial
              <input
                type="date"
                value={filters.startDate ?? ""}
                onChange={(event) =>
                  updateFilter("startDate", event.target.value)
                }
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Data final
              <input
                type="date"
                value={filters.endDate ?? ""}
                onChange={(event) =>
                  updateFilter("endDate", event.target.value)
                }
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Laboratório
              <select
                value={filters.lab ?? ""}
                onChange={(event) => updateFilter("lab", event.target.value)}
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              >
                <option value="">Todos</option>
                <option value="Lab 01">Lab 01</option>
                <option value="Lab 02">Lab 02</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Turno
              <select
                value={filters.shift ?? ""}
                onChange={(event) => updateFilter("shift", event.target.value)}
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              >
                <option value="">Todos</option>
                <option value="Manhã">Manhã</option>
                <option value="Noite">Noite</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Professor
              <input
                type="text"
                value={filters.teacher ?? ""}
                onChange={(event) =>
                  updateFilter("teacher", event.target.value)
                }
                placeholder="Nome do professor"
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-[#4A6A91]">
              Curso
              <input
                type="text"
                value={filters.course ?? ""}
                onChange={(event) => updateFilter("course", event.target.value)}
                placeholder="Nome do curso"
                className="h-11 rounded-lg border border-[#AEBBCD] px-3"
              />
            </label>
          </div>

          <button
            onClick={() => {
              const initialFilters = getInitialFilters();
              setFilters(initialFilters);
              setSearch("");
            }}
            className="mt-4 text-sm font-bold text-[#4E8BB8] underline"
          >
            Limpar filtros
          </button>
        </section>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <p className="py-10 text-center font-semibold text-[#4A6A91]">
            Carregando relatórios...
          </p>
        ) : report ? (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <IndicatorCard
                title="Reservas concluídas"
                value={report.indicators.totalCompleted}
                description="Total de utilizações registradas"
              />

              <IndicatorCard
                title="Mês de maior utilização"
                value={
                  highestMonth ? formatMonth(highestMonth.name) : "Sem dados"
                }
                description={
                  highestMonth
                    ? `${highestMonth.total} reservas concluídas`
                    : "Nenhuma utilização registrada"
                }
              />

              <IndicatorCard
                title="Horário mais utilizado"
                value={
                  mostUsedTimeSlot
                    ? `Horário ${mostUsedTimeSlot.name}`
                    : "Sem dados"
                }
                description={
                  mostUsedTimeSlot
                    ? `${mostUsedTimeSlot.total} reservas concluídas`
                    : "Nenhuma utilização registrada"
                }
              />
            </section>

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <BarList
                title="Utilização por laboratório"
                data={report.indicators.byLab}
              />
              <BarList
                title="Utilização por turno"
                data={report.indicators.byShift}
              />
              <BarList
                title="Utilização por mês"
                data={report.indicators.byMonth}
                formatLabel={formatMonth}
              />
              <BarList
                title="Comparação por semestre"
                data={report.indicators.bySemester}
              />
              <BarList
                title="Utilização por curso"
                data={report.indicators.byCourse}
              />
              <BarList
                title="Utilização por professor"
                data={report.indicators.byTeacher}
              />
            </section>

            <section className="rounded-2xl border border-[#D9E1EA] p-5">
              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#244870]">
                    Reservas concluídas
                  </h2>
                  <p className="text-sm font-semibold text-[#8FA3BD]">
                    {reservations.length} registros encontrados
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 rounded-lg bg-[#244870] px-4 py-2 font-semibold text-white"
                  >
                    <FileDown size={18} />
                    Exportar CSV
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-lg border border-[#244870] px-4 py-2 font-semibold text-[#244870]"
                  >
                    <Printer size={18} />
                    Imprimir
                  </button>
                </div>
              </div>

              <label className="mb-4 flex h-11 items-center gap-2 rounded-lg border border-[#AEBBCD] px-3 text-[#4E8BB8]">
                <Search size={19} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar professor, disciplina, curso ou laboratório"
                  className="min-w-0 flex-1 bg-transparent outline-none"
                />
              </label>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#D9E1EA] text-[#244870]">
                      <th className="p-3">Professor</th>
                      <th className="p-3">Disciplina</th>
                      <th className="p-3">Curso</th>
                      <th className="p-3">Laboratório</th>
                      <th className="p-3">Data</th>
                      <th className="p-3">Turno</th>
                      <th className="p-3">Horário</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservations.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#E8EDF3] text-[#4A6A91]"
                      >
                        <td className="p-3 font-semibold">{item.teacher}</td>
                        <td className="p-3">{item.subject}</td>
                        <td className="p-3">{item.course}</td>
                        <td className="p-3">{item.lab}</td>
                        <td className="p-3">{formatDate(item.date)}</td>
                        <td className="p-3">{item.shift}</td>
                        <td className="p-3">{item.time_slot}</td>
                      </tr>
                    ))}

                    {reservations.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-8 text-center font-semibold text-[#8FA3BD]"
                        >
                          Nenhuma reserva concluída encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
