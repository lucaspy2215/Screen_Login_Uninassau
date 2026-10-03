"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = {
    id: string;
    label: string;
    icon?: ReactNode;
    placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({ id, label, icon, type = "text", ...props }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-semibold text-black">
                {label}
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
                {icon && <span className="text-sky-600">{icon}</span>}

                <input
                    id={id}
                    type={isPassword && showPassword ? "text" : type}
                    className="w-full bg-transparent text-sky-700 placeholder:text-sky-600 outline-none"
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="text-sky-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;