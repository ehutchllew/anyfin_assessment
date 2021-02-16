export async function baseService(req: any, options: any) {
    const DEFAULT_HEADERS = {
        "Content-Type": "application/json",
    };
    const { body, headers = DEFAULT_HEADERS, method = "GET", path = "" } = req;
    const baseUrl = "http://localhost:3001/";
    const url = new URL(baseUrl + path);
    const fetchInit: RequestInit = {
        method,
        headers,
        credentials: "include",
    };

    if (body) {
        fetchInit.body = JSON.stringify(body);
    }

    if (options) {
        const searchParams = new URLSearchParams({});
        if (options.filter) {
            const hashedFilter = btoa(JSON.stringify(options.filter));
            searchParams.set("filter", hashedFilter);
        }

        if (options.sort) {
            const hashedSort = btoa(JSON.stringify(options.sort));
            searchParams.set("sort", hashedSort);
        }

        url.search = searchParams.toString();
    }
    console.log(url);
    const rawResponse = await fetch(url.toString(), fetchInit);

    const parsedResponse = await rawResponse.json();

    if (!rawResponse.ok) {
        throw parsedResponse;
    }
    /**
     * TODO: Consider having a global error handler here that checks the
     * `rawResponse` status and throws. The global error handler can be
     * a modal that renders globally and is shown based off redux state.
     */
    return parsedResponse;
}
