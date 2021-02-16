export class AbstractService<T> {
    constructor(protected readonly repository: T) {}

    protected to_json<T, K extends keyof T>(obj: T, keysToDelete: K[]): T {
        const objClone = { ...obj };
        keysToDelete.forEach((key) => {
            delete objClone[key];
        });
        return objClone;
    }
}
