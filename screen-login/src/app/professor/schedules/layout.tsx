import { ReactNode } from "react";
import { PanelLayout } from "@/components/panel-layout";

export default function ProfessorSchedulesLayout({ children }: { children: ReactNode }) {
  return <PanelLayout role="professor">{children}</PanelLayout>;
}
