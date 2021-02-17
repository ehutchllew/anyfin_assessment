import { baseService } from "./baseService";

export async function countryService(options?: any) {
    const method = "GET";
    const path = "country";

    const requestInit = {
        method,
        path,
    };
    return baseService(requestInit, options);
}
