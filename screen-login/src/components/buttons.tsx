import { ReactNode } from "react";

type BotaoProps = {
    onClick?: () => void;
    size?: "base" | "medium" | "large";
    children: ReactNode;
    colorsParam: "dark" | "light";
    weight: "400" | "600";
};

export const Button = ({
    children,
    size = "base",
    colorsParam,
    onClick,
    weight,
}: BotaoProps) => {
    const common = "flex flex-row items-center justify-center cursor-pointer font-inter rounded-xl";

    const classes = {
        base: "h-11 py-2 px-4 gap-2 text-lg",
        medium: "h-12 py-3 px-7 gap-4 text-base",
        large: "h-14 py-4.5 px-8 gap-5 text-base",
    };

    const colors = {
        dark: "bg-[#4E8BB8] text-white", //Azul//
        light: "bg-[#8ED5FF] text-[#00354A]",
    };

    const weightFont = {
        "400": "font-normal",
        "600": "font-semibold",
    };

    return (
        <button
            className={`${common} ${classes[size]} ${colors[colorsParam]} ${weightFont[weight]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};