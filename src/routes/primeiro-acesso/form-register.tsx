import { Controller, useForm } from "react-hook-form";
import type { RegisterRequestUser } from "../../schema/user";
import { useRegisterUser } from "../../api/auth/login-register";
import { Link } from "react-router-dom";

export function FormRegister() {
  const { control, reset, handleSubmit } = useForm<RegisterRequestUser>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {mutate: register, isPending, isSuccess} = useRegisterUser();

  const onSubmit = (data: RegisterRequestUser) => {
    register(data, {
      onSuccess: () => {
        console.log(data);
        reset()
      },
    })
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-purple-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700">FlowTask</h1>
          <h3 className="text-gray-500 mt-1">Registre-se aqui</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            control={control}
            name="username"
            rules={{ required: "Este campo é obrigátorio" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  placeholder="Digite seu nome"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-gray-800 outline-none transition
                    focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                    ${fieldState.error ? "border-red-400" : "border-gray-300"}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ required: "Este campo é obrigátorio" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  placeholder="Digite seu email"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-gray-800 outline-none transition
                    focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                    ${fieldState.error ? "border-red-400" : "border-gray-300"}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Este campo é obrigátorio" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-gray-800 outline-none transition
                    focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                    ${fieldState.error ? "border-red-400" : "border-gray-300"}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800
              text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
          >
            {isPending ? "Registrando..." : "Registrar"}
          </button>
          <h1 className="text-sm text-green-400 justify-center">{isSuccess && "Usuário registrado"}</h1>
          <Link to="/login" className="text-gray-500 cursor-pointer">Tem cadastro?</Link>
        </form>
      </div>
    </div>
  );
}