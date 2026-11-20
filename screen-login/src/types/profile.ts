
import type { ReactNode } from "react";

export type EditType = "email" | "registration" | "password" | null;

export type SquarePenProps = {
  label: string;
  value: string;
  onEdit: () => void;
};

export type FieldProps = {
  label: string;
  children: ReactNode;
};
