"use client";

import { useState, FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/buttons";
import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { request } from "@/lib/api";
import { saveSession, AuthSession } from "@/lib/auth";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toEnterLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await request<AuthSession>("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!result?.token || !result?.user) {
        throw new Error("Resposta inválida do servidor.");
      }

      if (result.user.role !== "admin" && result.user.role !== "teacher") {
        throw new Error("Perfil de usuário inválido.");
      }

      saveSession(result);

      if (result.user.role === "admin") {
        router.replace("/admin/agenda");
      } else {
        router.replace("/professor/agenda");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível realizar o login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full max-w-90 flex-1 flex-col items-center justify-center gap-4">
        <div className="w-full">
          <Button
            size="text"
            colorsParam="link"
            weight="600"
            iconLeft={<ArrowLeft size={16} />}
            onClick={() => router.replace("/")}
          >
            Voltar
          </Button>
        </div>

        <Logo size="large" />

        <form
          onSubmit={toEnterLogin}
          className="flex w-full flex-col items-center gap-4"
        >
          <label className="w-full font-semibold text-black">
            Login
            <Input
              icon={<Mail size={20} />}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="w-full font-semibold text-black">
            Senha
            <Input
              icon={<Lock size={20} />}
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              right={
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </label>

          {error && (
            <p className="w-full text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button size="text" colorsParam="link" weight="600">
            Esqueci minha Senha
          </Button>

          <Button
            size="small"
            colorsParam="navy"
            weight="600"
            className={loading ? "opacity-60" : ""}
          >
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </Button>
        </form>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">
        AGENDAMENTO LAB.
      </h3>
    </div>
  );
}
