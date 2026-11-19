"use client";

import { SyntheticEvent, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons";
import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { Modal } from "@/components/modal";
import { closedFormValues } from "@/lib/forms";
import { errorClass, labelClass } from "@/lib/styles";
import { activateAccount } from "@/lib/teachers";

const MIN_PASSWORD_LENGTH = 8;

const fields = [
  { label: "Senha", name: "password" },
  { label: "Confirmar senha", name: "confirm" },
];

export default function ActivateAccountPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    const { password, confirm } = closedFormValues(e) as Record<string, string>;
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) return setError("Link inválido. Peça um novo e-mail de ativação.");
    if (password.length < MIN_PASSWORD_LENGTH)
      return setError(`A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
    if (password !== confirm) return setError("As senhas não conferem.");
    if (sending) return;

    setError("");
    setSending(true);
    try {
      await activateAccount(token, password);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full max-w-90 flex-1 flex-col items-center justify-center gap-4">
        <Logo size="large" />
        <h1 className="text-xl font-bold text-[#244870]">CRIE SUA SENHA</h1>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          {fields.map(({ label, name }) => (
            <label key={name} className={labelClass}>
              {label}
              <Input
                name={name}
                type={show ? "text" : "password"}
                icon={<Lock size={20} />}
                required
                right={
                  <button type="button" onClick={() => setShow(!show)}>
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </label>
          ))}

          {error && <p className={errorClass}>{error}</p>}

          <div className="mt-3 flex justify-center">
            <Button size="small" colorsParam="navy" weight="600">
              {sending ? "Ativando..." : "Ativar conta"}
            </Button>
          </div>
        </form>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">AGENDAMENTO LAB.</h3>

      <Modal
        open={success}
        onClose={() => router.push("/login")}
        closeButton
        title="CONTA ATIVADA!"
        text="Agora você já pode entrar com seu e-mail e senha."
      />
    </div>
  );
}