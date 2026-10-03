"use client";
import { User, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { InputField } from "@/components/input";
import { Button } from "@/components/buttons";

export default function EnrollmentPage() {
    return (
        <main className="flex min-h-screen justify-center bg-white">
            <div className="flex w-full max-w-sm flex-col items-center gap-6 px-8 py-10">
                <Logo size="large" />

                <h1 className="text-2xl font-bold text-black">Tela de Matrícula</h1>

                <div className="flex w-full flex-col gap-4">
                    <InputField
                        id="login"
                        label="Login"
                        placeholder="matrícula"
                        icon={<User size={16} />}
                    />
                    <InputField
                        id="password"
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        icon={<Lock size={16} />}
                    />
                    <Button
                        size="base"
                        colorsParam="dark"
                        weight="600"
                        onClick={() => {
                            // Lógica de autenticação aqui
                        }}
                    >
                        Entrar
                    </Button>
                </div>
            </div>
        </main>
    );
}