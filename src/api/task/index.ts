import { useQuery } from "@tanstack/react-query";
import type { TaskResponse } from "../../schema/task"
import { authStorage } from "../auth"
import { API_URL_TASKS } from "../definition"


async function getTasks(): Promise<Array<TaskResponse>> {

    const token = authStorage.getToken();

    const response = await fetch(API_URL_TASKS, {
        method: "GET",
        headers: {
            "Authorization":`Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Erro ao buscar lista");
    }

    return response.json()
}

export function useTaksData() {
    const query = useQuery({
        queryKey: ["get-tasks"],
        queryFn: getTasks,
    })

    return query;
}