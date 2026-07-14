import { Controller, useForm } from "react-hook-form";
import { Priority, Status } from "../../../schema/task";
import { Select } from "@mantine/core";
import { useAddTaks } from "../../../api/task";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import z from "zod";

const inputClass = `w-full rounded-lg border px-4 py-2.5 text-gray-800 outline-none transition
  focus:ring-2 focus:ring-purple-400 focus:border-purple-400 border-gray-300`;

const selectStyles = {
  input: {
    borderRadius: "0.5rem",
    borderColor: "#d1d5db",
    padding: "0.625rem 1rem",
    height: "auto",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "0.25rem",
  },
};

interface ModalAddTaskProps {
  onClose?: () => void;
}

const tasksSchema = z.object({
  name: z.string(),
  isCompleted: z.boolean(),
  date: z.string(),
  priority: z.enum(Priority).default(Priority.MEDIUM),
  status: z.enum(Status).default(Status.PENDING),
});

type TasksListSchema = z.infer<typeof tasksSchema>;

export function ModalAddTask({ onClose }: ModalAddTaskProps) {
  const { control, reset, handleSubmit } = useForm<TasksListSchema>({
    defaultValues: {
      name: "",
      isCompleted: false,
      date: "",
      priority: Priority.MEDIUM,
      status: Status.PENDING,
    },
  });

  const { mutate: task, isPending, isSuccess } = useAddTaks();

  const onSubmit = (data: TasksListSchema) => {
    task(data, {
      onSuccess: () => {
        reset();
        onClose?.();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-purple-200 p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/tasks"
            onClick={onClose}
            aria-label="Voltar"
            className="text-gray-400 hover:text-purple-600 transition-colors -ml-1 p-1 rounded-lg hover:bg-purple-50"
          >
            <HiChevronLeft size={22} />
          </Link>
          <h1 className="text-xl font-bold text-purple-700">
            Adicionar Tarefa
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  className={`${inputClass} ${
                    fieldState.error ? "border-red-400" : "border-gray-300"
                  }`}
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
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`${inputClass} ${
                    fieldState.error ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
                    styles={selectStyles}
                    error={fieldState.error?.message}
                  />
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
                    styles={selectStyles}
                    error={fieldState.error?.message}
                  />
                </div>
              )}
            />
          </div>

          <Controller
            control={control}
            name="isCompleted"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState }) => (
              <div>
                <Select
                  data={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  label="Completo"
                  value={String(field.value)}
                  onChange={(value) => field.onChange(value === "true")}
                  placeholder="Escolha"
                  styles={selectStyles}
                  error={fieldState.error?.message}
                />
              </div>
            )}
          />

          <div className="flex gap-3 pt-2">
            <Link
              to="/tasks"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50
                font-semibold py-2.5 rounded-lg transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800
                disabled:opacity-60 disabled:cursor-not-allowed
                text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
          <p className="text-center text-green-500 font-bold">{isSuccess && "Tarefa adicionada com sucesso!"}</p>
        </form>
      </div>
    </div>
  );
}
