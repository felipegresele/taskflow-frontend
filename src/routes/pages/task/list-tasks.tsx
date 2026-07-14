import { IoPencil, IoTrash } from "react-icons/io5";
import { useDeleteTask, useSearchTask, useTasksData } from "../../../api/task";
import { Link } from "react-router-dom";
import { ModalUpdateTask } from "./update-task";
import type { Task } from "../../../schema/task";
import { memo, useCallback, useState } from "react";
import { SearchTask } from "./search-task";

export function ListTasks() {
  const [searchName, setSearchName] = useState("");
  const { data: lista, isPending, isError } = useTasksData();
  const { mutate: remove } = useDeleteTask();
  const {data: searchData} = useSearchTask({name: searchName})
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const displayList = searchName.trim() ? searchData : lista;

  const handleDeleteTask = useCallback(
    (id: number) => {
      remove(
        { id },
        {
          onSuccess: () => {
            console.log("Tarefa excluida ID: " + id);
          },
        },
      );
    },
    [remove],
  );

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            Lista de Tarefas
          </h1>
          <Link
            to="/add-task"
            className="bg-purple-500 p-2 rounded-xl h-10 font-bold text-white cursor-pointer"
          >
            Adicionar
          </Link>
        </div>

        <SearchTask value={searchName} onChange={setSearchName} />

        <div className="space-y-4">
          {displayList?.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>

        {displayList?.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Nenhuma tarefa encontrada.
          </p>
        )}
      </div>

        {editingTask && (
        <ModalUpdateTask
          isOpen={!!editingTask}
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

interface TaskItemProps {
  item: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem = memo(function TaskItem({
  item,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md shadow-purple-100 p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
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
        <button onClick={() => onEdit(item)}>
          <IoPencil />
        </button>

        <button onClick={() => onDelete(item.id)}>
          <IoTrash />
        </button>
      </div>
    </div>
  );
});
