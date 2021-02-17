import { baseService } from "./baseService";

export async function loginService(
    creds: { password: string; username: string },
    options?: any
) {
    const body = {
        password: creds.password,
        username: creds.username,
    };
    const method = "POST";
    const path = "login";

    const requestInit = {
        body,
        method,
        path,
    };
    return baseService(requestInit, options);
}
