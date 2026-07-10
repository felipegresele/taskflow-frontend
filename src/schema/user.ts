export interface User {
    username: string;
    email: string;
    password: string;
}

export interface RegisterRequestUser {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponseUser {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    acessToken: string;
}