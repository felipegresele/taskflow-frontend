export interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
    date: string;
    priority: string;
    status: string;
}

export interface TaskResponse {
    id: number;
    name: string;
    isCompleted: boolean;
    date: string;
    priority: string;
    status: string;
}