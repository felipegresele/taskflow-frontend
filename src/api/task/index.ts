import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TaskRequest, TaskResponse } from "../../schema/task";
import { authStorage } from "../auth";
import { API_URL_TASKS } from "../definition";

async function getTasks(): Promise<Array<TaskResponse>> {
  const token = authStorage.getToken();

  const response = await fetch(API_URL_TASKS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar lista");
  }

  return response.json();
}

export function useTasksData() {
  const query = useQuery({
    queryKey: ["get-tasks"],
    queryFn: getTasks,
  });

  return query;
}

async function addTasks(data: TaskRequest): Promise<TaskResponse> {
  const token = authStorage.getToken();

  const response = await fetch(API_URL_TASKS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar lista");
  }

  return response.json();
}

export function useAddTaks() {
  return useMutation({
    mutationKey: ["add-tasks"],
    mutationFn: addTasks,
  });
}

async function deleteTask(data: { id: number }) {
  const token = authStorage.getToken();

  const response = await fetch(API_URL_TASKS + `/${data.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar lista");
  }

  // Caso a API retorne 204 No Content
  if (response.status === 204) {
    return;
  }

  return response.json();
}

export function useDeleteTask() {

const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: deleteTask,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["get-tasks"]
        })
    }
  });
}
