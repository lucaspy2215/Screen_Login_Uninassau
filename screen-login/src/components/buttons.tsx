import { ReactNode } from "react";

type BotaoProps = {
  onClick?: () => void;
  size?: "base" | "medium" | "large" | "small" | "text";
  children: ReactNode;
  colorsParam: "dark" | "light" | "navy" | "link";
  weight: "400" | "600";
  iconLeft?: ReactNode;
};

export const Button = ({
  children,
  size,
  colorsParam,
  onClick,
  weight,
  iconLeft,
}: BotaoProps) => {
  const classes = {
    base: "flex flex-row items-center justify-center w-90 h-11 text-lg rounded-md py-2 px-4 gap-4 cursor-pointer font-inter rounded-xl",
    medium: "gap-4 py-3 px-7 text-base",
    large: "rounded-xl py-4.5 px-8 gap-5 text-base",
    small: "w-56! rounded-full!", // ENTRAR
    text: "w-auto! h-auto! p-0! text-sm! gap-1!", // Esqueci minha senha, Voltar
  };

  const colors = {
    dark: "bg-[#4E8BB8] text-white", //Azul//
    light: "bg-[#8ED5FF] text-[#00354A]",
    navy: "bg-[#244870] text-white", //Azul escuro//
    link: "bg-transparent text-[#4E8BB8]",
  };

  const weightFont = {
    "400": "font-normal",
    "600": "font-semibold",
  };

  return (
    <button
      className={`${classes.base} ${size === "large" ? classes.large : ""} ${size === "small" ? classes.small : ""} ${size === "text" ? classes.text : ""} ${colors[colorsParam]} ${weightFont[weight]}`}
      onClick={onClick}
    >
      {iconLeft}
      {children}
    </button>
  );
};