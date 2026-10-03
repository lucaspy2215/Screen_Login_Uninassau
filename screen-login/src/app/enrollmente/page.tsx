import { Button } from "@/components/buttons";
import { Logo } from "@/components/logo";
import { InputField } from "@/components/label";


export default function EnrollmentPage() {
    return (
        <main>
            <div className="flex flex-col items-center min-h-screen bg-white">
                <Logo size="large" />
                <h1 className="text-2xl font-bold mb-4 text-black">
                    Tela de Matrícula
                </h1>

                <InputField
                    id="login"
                    label="Login"
                    placeholder="Digite seu login"
                />
                <InputField
                    id="password"
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                />
            </div>
        </main>
    );
}