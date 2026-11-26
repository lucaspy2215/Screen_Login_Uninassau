"use client";

import { Button } from "@/components/buttons";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, UserRound } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <Logo size="large" />

        <h1 className="mb-4 text-2xl font-bold text-black">
          Laboratorio de Informática
        </h1>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="base"
            colorsParam="dark"
            weight="600"
            iconLeft={<CalendarDays size={20} />}
            onClick={() => router.push("/agenda")}
          >
            AGENDA
          </Button>

          <Button
            size="base"
            colorsParam="dark"
            weight="600"
            iconLeft={<Users size={20} />}
            onClick={() => router.push("/login?role=admin")}
          >
            ADMINISTRAÇÃO
          </Button>

          <Button
            size="base"
            colorsParam="dark"
            weight="600"
            iconLeft={<UserRound size={20} />}
            onClick={() => router.push("/login?role=teacher")}
          >
            PROFESSOR
          </Button>
        </div>
      </div>

      <h3 className="pb-4 text-lg font-semibold text-black">AGENDAMENTO LAB</h3>
    </div>
  );
}
