import { ReactNode } from "react";
import { PanelLayout } from "@/components/panel-layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <PanelLayout role="admin">{children}</PanelLayout>;
}