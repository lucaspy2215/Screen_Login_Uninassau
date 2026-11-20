"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  CircleUserRound,
  LogOut,
  LucideIcon,
} from "lucide-react";

import { clearSession } from "@/lib/auth";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ title, items, open, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-10 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-20 flex h-full w-72 flex-col rounded-r-3xl bg-[#244870] py-6 text-white transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button type="button" onClick={onClose} className="self-end px-6">
          <ChevronRight size={20} />
        </button>

        <div className="flex flex-col items-center gap-2 pb-6">
          <CircleUserRound size={64} strokeWidth={1.5} />
          <p className="font-semibold">{title}</p>
        </div>

        <nav className="flex flex-1 flex-col">
          {items.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-6 py-3 font-semibold ${
                pathname === href ? "bg-[#DDF0FD] text-[#244870]" : ""
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 font-semibold"
        >
          <LogOut size={20} />
          Encerrar sessão
        </button>
      </aside>
    </>
  );
};
