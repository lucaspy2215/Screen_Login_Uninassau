
import { ReactNode } from "react";

type BotaoProps = {
    onClick?: () => void;
    size?: "base" | "medium" | "large";
    children: ReactNode;
    colorsParam: "dark" | "light";
    weight: "400" | "600";
};

export  const Button = ({
    children,
    size,
    colorsParam,
    onClick,
    weight,
}: BotaoProps) => {
    const classes = {
        base: "flex flex-row items-center justify-center w-90 h-11 text-lg rounded-md py-2 px-4 gap-2 cursor-pointer font-inter rounded-xl",
        medium: "gap-4 py-3 px-7 text-base",
        large: "rounded-xl py-4.5 px-8 gap-5 text-base",
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
            className={`${classes.base} ${size === "large" ? classes.large : ""} ${colors[colorsParam]} ${weightFont[weight]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
