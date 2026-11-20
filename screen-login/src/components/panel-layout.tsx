"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarCog,
  CalendarDays,
  FileText,
  Menu,
  UserCog,
  UserRound,
} from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { getSession } from "@/lib/auth";

const menus = {
  admin: {
    title: "Administrador",
    items: [
      { label: "Perfil", href: "/admin/profile", icon: UserRound },
      { label: "Solicitações", href: "/admin/requests", icon: Bell },
      {
        label: "Gerenciar professores",
        href: "/admin/teachers",
        icon: UserCog,
      },
      { label: "Relatório", href: "/admin/report", icon: FileText },
      {
        label: "Gerenciar horários",
        href: "/admin/schedules",
        icon: CalendarCog,
      },
    ],
  },
  professor: {
    title: "Professor",
    items: [
      { label: "Perfil", href: "/professor/profile", icon: UserRound },
      {
        label: "Meus Horários",
        href: "/professor/schedules",
        icon: CalendarDays,
      },
      { label: "Notificações", href: "/professor/notifications", icon: Bell },
    ],
  },
};

type PanelLayoutProps = {
  role: keyof typeof menus;
  children: ReactNode;
};

export const PanelLayout = ({ role, children }: PanelLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const expectedRole = role === "admin" ? "admin" : "teacher";

    if (session.user.role !== expectedRole) {
      if (session.user.role === "admin") {
        router.replace("/admin/agenda");
      } else {
        router.replace("/professor/agenda");
      }

      return;
    }

    setChecked(true);
  }, [role, router]);

  if (!checked) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-10 text-[#244870]"
      >
        <Menu />
      </button>

      <Sidebar {...menus[role]} open={open} onClose={() => setOpen(false)} />

      {children}
    </>
  );
};
