import { Button } from "@/components/buttons";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">

      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Laboratorio de Informática
        </h1>

        <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full max-w-90">
          <Button size="base" colorsParam="dark" weight="400">
            Login
          </Button>
          <Button size="base" colorsParam="dark" weight="400">
            Register
          </Button>
        </div>
      </div>


      <h3 className="text-lg pb-4 font-semibold text-black">
        AGENDAMENTO LAB
      </h3>
    </div>
  );
}

