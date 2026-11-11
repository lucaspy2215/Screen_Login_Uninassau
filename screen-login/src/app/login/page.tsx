"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { Button } from "@/components/buttons";
import { Input } from "@/components/input";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full max-w-90 flex-1 flex-col items-center justify-center gap-4">
        <div className="w-full">
          <Button
            size="text"
            colorsParam="link"
            weight="600"
            iconLeft={<ArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </div>
        <Logo size="large" />

        <label className="w-full font-semibold text-black">
          Login
          <Input icon={<UserRound size={20} />} placeholder="matrícula" />
        </label>

        <label className="w-full font-semibold text-black">
          Senha
          <Input
            icon={<Lock size={20} />}
            type={show ? "text" : "password"}
            placeholder="••••••••"
            right={
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />
        </label>
        <Button size="text" colorsParam="link" weight="600">
          Esqueci minha Senha
        </Button>
        <Button size="small" colorsParam="navy" weight="600">
          ENTRAR
        </Button>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">
        AGENDAMENTO LAB.
      </h3>
    </div>
  );
}
