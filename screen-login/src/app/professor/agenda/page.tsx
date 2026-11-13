"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AgendaView} from "@/components/agenda-view";
import { Button } from "@/components/buttons";

export default function ProfessorAgendaPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-white pt-16">
      <div className="w-full max-w-md px-4">
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

      <AgendaView />

      <h3 className="mt-auto pb-4 text-lg font-semibold text-black">
        AGENDAMENTO LAB.
      </h3>
    </div>
  );
}