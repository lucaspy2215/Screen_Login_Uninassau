"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AgendaView } from "@/components/agenda-view";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/modal";

export default function AdminAgendaPage() {
  const router = useRouter();
  const [showExitModal, setShowExitModal] = useState(false);

  const handleExit = () => {
    setShowExitModal(false);
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-white pt-16">
      <div className="w-full max-w-md px-4">
        <Button
          size="text"
          colorsParam="link"
          weight="600"
          iconLeft={<ArrowLeft size={16} />}
          onClick={() => setShowExitModal(true)}
        >
          Voltar
        </Button>
      </div>

      <AgendaView />

      <h3 className="mt-auto pb-4 text-lg font-semibold text-black">
        AGENDAMENTO LAB.
      </h3>

      <Modal
        open={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Sair do Agendamento Lab?"
        text="Tem certeza de que deseja sair do Agendamento Lab?"
      >
        <div className="mt-6 flex justify-center gap-3">
          <Button
            size="small"
            colorsParam="link"
            weight="600"
            onClick={() => setShowExitModal(false)}
          >
            Cancelar
          </Button>

          <Button
            size="small"
            colorsParam="navy"
            weight="600"
            onClick={handleExit}
          >
            Sim, sair
          </Button>
        </div>
      </Modal>
    </div>
  );
}
