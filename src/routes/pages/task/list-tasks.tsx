import { useTaksData } from "../../../api/task";

export function ListTasks() {
  const { data: lista, isPending, isError } = useTaksData();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-gray-500">Carregando tarefas...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-red-500">Erro ao carregar tarefas.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Lista de Tarefas
        </h1>

        <div className="space-y-4">
          {lista?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md shadow-purple-100 p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    item.isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.isCompleted ? "Finalizada" : "Pendente"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                  📅 {item.date}
                </span>
                <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md">
                  🏷️ {item.priority}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
                  📌 {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {lista?.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Nenhuma tarefa encontrada.
          </p>
        )}
      </div>
    </div>
  );
}