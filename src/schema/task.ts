export interface Task {
    id: number;
    name: string;
    isCompleted: boolean;
    date: string;
    priority: Priority;
    status: Status;
}

export interface TaskResponse {
    id: number;
    name: string;
    isCompleted: boolean;
    date: string;
    priority: string;
    status: string;
}

export interface TaskRequest {
    name: string;
    isCompleted: boolean;
    date: string;
    priority: string;
    status: string;
}

export const Priority = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD"
}

export type Priority = typeof Priority[keyof typeof Priority];

export const Status = {
    PENDING: "PENDING",
    PROGRESS: "PROGRESS",
    COMPLETED: "COMPLETED",
    REJECTED: "REJECTED",
} 

export type Status = typeof Status[keyof typeof Status];