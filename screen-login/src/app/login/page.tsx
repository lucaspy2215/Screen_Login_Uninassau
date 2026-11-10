"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { Button } from "@/components/buttons";
import { Input } from "@/components/input";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full max-w-90 flex-1 flex-col items-center justify-center gap-4">
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

        <Button size="base" colorsParam="dark" weight="600">
          ENTRAR
        </Button>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">AGENDAMENTO LAB.</h3>
    </div>
  );
}