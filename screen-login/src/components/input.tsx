"use client";


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = {
    id: string;
    label: string;
    icon?: ReactNode;
    size?: "base" | "large";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const sizes = {
    base: {
        label: "text-base font-bold",
        box: "h-10 gap-2 rounded-lg border-2 border-[#8ED5FF] px-3 focus-within:border-[#4E8BB8]",
        input: "text-base font-bold",
        iconSize: 16,
    },
    large: {
        label: "text-base font-bold",
        box: "h-12 gap-3 rounded-xl border-2 border-neutral-700 px-4 focus-within:border-black",
        input: "text-base font-normal",
        iconSize: 20,
    },
};
export const InputField = ({
    id,
    label,
    icon,
    size = "base",
    type = "text",
    ...props
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const styles = sizes[size];

    return (
        <div className="flex w-full flex-col gap-1">
            <label htmlFor={id} className={`text-black ${styles.label}`}>
                {label}
            </label>

            <div className={`flex items-center bg-[#E3F4FF] text-[#4E8BB8] ${styles.box}`}>
                {icon && <span className="flex shrink-0">{icon}</span>}

                <input
                    id={id}
                    type={isPassword && showPassword ? "text" : type}
                    className={`w-full bg-transparent text-[#4E8BB8] outline-none placeholder:text-[#4E8BB8] ${styles.input}`}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="flex shrink-0"
                    >
                        {showPassword ? (
                            <EyeOff size={styles.iconSize} />
                        ) : (
                            <Eye size={styles.iconSize} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};