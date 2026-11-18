 "use client";

import { ChevronLeft, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";
import { useTeachers } from "@/hooks/useTeachers";
import { formatInitials } from "@/lib/format";
import { errorClass, fieldClass, iconButtonClass, labelClass } from "@/lib/styles";

const fields = [
  { label: "Nome", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Matrícula", name: "matricula", type: "text" },
] as const;

const feedbackTexts = {
  created: {
    title: "CADASTRO CONCLUÍDO!",
    text: "O professor já aparece na lista de usuários.",
  },
  edited: {
    title: "EDIÇÃO CONCLUÍDA!",
    text: "As alterações já estão visíveis na lista de professores.",
  },
};

export default function TeachersPage() {
  const router = useRouter();
  const {
    filtered,
    search,
    setSearch,
    creating,
    setCreating,
    editing,
    setEditing,
    deleting,
    setDeleting,
    feedback,
    setFeedback,
    error,
    loadFailed,
    closeModals,
    addAndEditSubmitForm,
    confirmDelete,
  } = useTeachers();

  const message = feedback ? feedbackTexts[feedback] : null;

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-16">
      <div className="flex w-full max-w-md flex-col gap-4 px-4">
        <button onClick={() => router.back()} className="w-fit text-[#244870]">
          <ChevronLeft />
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#244870]">PROFESSORES</h1>
            <p className="font-semibold text-[#4E8BB8]">
              {filtered.length}{" "}
              {filtered.length === 1 ? "Cadastrado" : "Cadastrados"}
            </p>
          </div>
          <Button
            colorsParam="navy"
            weight="600"
            iconLeft={<Plus size={20} />}
            className="w-32!"
            onClick={() => setCreating(true)}
          >
            Novo
          </Button>
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

        {loadFailed && (
          <p className={errorClass}>
            Não foi possível carregar os professores. A API está rodando?
          </p>
        )}

        <ul className="flex flex-col gap-3">
          {filtered.map((teacher) => (
            <li key={teacher.id} className="flex items-center gap-4 p-1">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#244870] font-bold text-white">
                {formatInitials(teacher.name)}
              </span>
              <div className="min-w-0 flex-1 text-sm font-semibold text-[#4A6A91]">
                <p className="text-[#244870]">{teacher.name}</p>
                <p className="truncate">{teacher.email}</p>
                <p>{teacher.matricula}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  colorsParam="navy"
                  weight="400"
                  className={iconButtonClass}
                  onClick={() => setEditing(teacher)}
                >
                  <SquarePen size={18} />
                </Button>
                <Button
                  colorsParam="navy"
                  weight="400"
                  className={iconButtonClass}
                  onClick={() => setDeleting(teacher)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={creating || !!editing} onClose={closeModals} closeButton>
        <form onSubmit={addAndEditSubmitForm} className="flex flex-col gap-3">
          <h2 className="font-bold text-[#244870]">
            {editing ? "EDITAR PROFESSOR" : "ADICIONAR PROFESSOR"}
          </h2>

          {fields.map(({ label, name, type }) => (
            <label key={name} className={labelClass}>
              {label}
              <input
                name={name}
                type={type}
                defaultValue={editing?.[name]}
                required
                className={fieldClass}
              />
            </label>
          ))}

          {error && <p className={errorClass}>{error}</p>}

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              {editing ? "Editar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleting} onClose={closeModals}>
        <h2 className="font-bold text-[#244870]">EXCLUIR PROFESSOR?</h2>
        <p className="mt-2 font-semibold text-[#4A6A91]">
          {deleting?.name} · {deleting?.matricula}
        </p>

        {error && <p className={errorClass}>{error}</p>}

        <div className="mt-6 flex gap-3">
          <div className="flex-1 [&>button]:w-full!">
            <Button size="small" colorsParam="danger" weight="600" onClick={confirmDelete}>
              Excluir
            </Button>
          </div>
          <div className="flex-1 [&>button]:w-full!">
            <Button size="small" colorsParam="navy" weight="600" onClick={closeModals}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!feedback}
        onClose={() => setFeedback(null)}
        closeButton
        title={message?.title}
        text={message?.text}
      />
    </div>
  );
}