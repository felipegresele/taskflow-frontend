import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse, RegisterRequestUser, RegisterResponseUser } from "../../../schema/user";
import { API_URL } from "../../definition";
import { authStorage } from "..";

async function registerUser(data : RegisterRequestUser): Promise<RegisterResponseUser> {
    const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
    }

    return response.json();
}

export function useRegisterUser() {
    return useMutation({
        mutationKey: ["register-user"],
        mutationFn: registerUser
    })
}

async function loginUser(data : LoginRequest): Promise<LoginResponse> {
    const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Erro ao fazer login")
    }

    return response.json();
}

export function useLoginUser() {

    return useMutation({
        mutationKey: ["login-user"],
        mutationFn: loginUser,
        onSuccess: (data) => {
            authStorage.setToken(data.acessToken);
        }
    })
}