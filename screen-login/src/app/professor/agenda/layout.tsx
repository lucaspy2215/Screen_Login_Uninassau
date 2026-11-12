import { ReactNode } from "react";
import { PanelLayout } from "@/components/panel-layout";

export default function ProfessorLayout({ children }: { children: ReactNode }) {
  return <PanelLayout role="professor">{children}</PanelLayout>;
}