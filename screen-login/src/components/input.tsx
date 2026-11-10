import { ComponentProps, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & {
  icon?: ReactNode;
  right?: ReactNode;
};

export const Input = ({ icon, right, ...props }: InputProps) => (
  <div className="flex h-10 w-full items-center gap-2 rounded-lg border-2 border-[#9CC5E6] bg-[#DDF0FD] px-3 text-[#4E8BB8]">
    {icon}
    <input
      className="flex-1 bg-transparent font-semibold outline-none placeholder:text-[#4E8BB8]"
      {...props}
    />
    {right}
  </div>
);