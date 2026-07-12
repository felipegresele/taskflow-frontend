import { Controller, useForm } from "react-hook-form";
import { Priority, Status, type TaskRequest } from "../../../schema/task";
import { Select } from "@mantine/core";
import { useAddTaks } from "../../../api/task";
import { HiChevronLeft } from "react-icons/hi";

export function ModalAddTask() {
  const { control, reset, handleSubmit } = useForm<TaskRequest>({
    defaultValues: {
      name: "",
      isCompleted: false,
      date: "",
      priority: Priority.MEDIUM,
      status: Status.PENDING,
    },
  });

  const { mutate: task, isPending } = useAddTaks();

  const onSubmit = (data: TaskRequest) => {
    task(data, {
      onSuccess: () => {
        console.log(data);
        reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <HiChevronLeft />
      <h1>Adicionar Tarefa:</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  placeholder="Digite o nome"
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
            name="date"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previsão de entrega
                </label>
                <input
                  type="datetime-local"
                  placeholder="Escolha a data"
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
            name="isCompleted"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  data={[
                    { value: true, label: "Sim" },
                    { value: false, label: "Não" },
                  ]}
                  label="Completo"
                  value={field.value}
                  placeholder="Escolha"
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
            name="priority"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  data={Object.values(Priority).map((value) => ({
                    value,
                    label: value,
                  }))}
                  label="Prioridade"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Selecione"
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
            name="status"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  data={Object.values(Status).map((value) => ({
                    value,
                    label: value,
                  }))}
                  label="Status"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Selecione"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <button>{isPending ? "Salvando..." : "Salvar"}</button>
        </form>
      </div>
    </div>
  );
}
