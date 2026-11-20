"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CircleUserRound,
  Pencil,
  SquarePen as SquarePenIcon,
  X,
} from "lucide-react";

import { Input } from "@/components/input";
import { getSession } from "@/lib/auth";
import type { EditType, SquarePenProps, FieldProps } from "@/types/profile";

export default function AdminProfilePage() {
  const router = useRouter();

  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const [editType, setEditType] = useState<EditType>(null);
  const [newEmail, setNewEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setSession(getSession());
  }, []);

  const closeEdit = () => {
    setEditType(null);
    setFeedback("");
    setNewEmail("");
    setRegistration("");
    setOldPassword("");
    setNewPassword("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("A atualização será conectada ao backend na próxima etapa.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 pt-4">
      <div className="w-full max-w-[324px] pt-[56px]">
        <button
          type="button"
          onClick={() => router.push("/admin/agenda")}
          className="mb-[54px] w-fit text-[#174D78]"
        >
          <ChevronLeft size={23} />
        </button>

        <div className="mb-[42px] flex flex-col items-center gap-3">
          <CircleUserRound size={58} className="text-[#174D78]" />

          <h2 className="text-[16px] font-semibold text-[#174D78]">
            Professor
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <ProfileField
            label="Email"
            value={session?.user.email ?? ""}
            onEdit={() => setEditType("email")}
          />

          <ProfileField
            label="Matrícula"
            value={session?.user.registration_number ?? ""}
            onEdit={() => setEditType("registration")}
          />

          <ProfileField
            label="Senha"
            value="••••••••••"
            onEdit={() => setEditType("password")}
          />
        </div>
      </div>

      {editType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
          <section className="relative w-full max-w-[324px] rounded-[26px] border border-[#C5D9EA] bg-white px-5 py-8">
            <button
              type="button"
              onClick={closeEdit}
              className="absolute right-5 top-5 text-[#174D78]"
            >
              <X size={23} />
            </button>

            <h2 className="mb-6 font-semibold text-[#174D78]">
              {editType === "email" && "Alterar Email"}
              {editType === "registration" && "Alterar Matrícula"}
              {editType === "password" && "Alterar senha"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {editType === "email" && (
                <>
                  <Field label="Novo Email">
                    <Input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Senha">
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </Field>
                </>
              )}

              {editType === "registration" && (
                <>
                  <Field label="Nova Matrícula">
                    <Input
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Senha">
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </Field>
                </>
              )}

              {editType === "password" && (
                <>
                  <Field label="Senha antiga">
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Nova senha">
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Field>
                </>
              )}

              {feedback && (
                <p className="text-center text-sm text-[#174D78]">{feedback}</p>
              )}

              <button
                type="submit"
                className="mx-auto mt-5 rounded-full bg-[#174D78] px-9 py-2 font-semibold text-white hover:bg-[#123C5E]"
              >
                Confirmar
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

function ProfileField({ label, value, onEdit }: SquarePenProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1 font-semibold text-[#174D78]">{label}</label>

      <div className="flex items-center gap-2">
        <Input value={value} readOnly />

        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#174D78] text-white"
        >
          <SquarePenIcon size={18} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 font-semibold text-[#174D78]">
      {label}
      {children}
    </label>
  );
}
