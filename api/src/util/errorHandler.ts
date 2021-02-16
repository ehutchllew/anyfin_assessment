import { Response } from "express";

export interface IError {
    message: string;
    name: string;
    stack?: any;
    status: number;
    [k: string]: any;
}

export enum SERVICE_ERRORS {
    CAST = "CastError",
    DOCUMENT_NOT_FOUND = "DocumentNotFoundError",
    FAILED_LOGIN = "FailedLogin",
    LIMIT_FILE_SIZE = "LimitFileSize",
    MALFORMED = "MalformedBody",
    PARALLEL_SAVE = "ParallelSaveError",
    UNAUTHENTICATED = "UnauthenticatedAccessRequest",
    UNSUPPORTED_FILETYPE = "UnsupportedFileType",
    USERNAME_UNAVAILABLE = "UsernameUnavailable",
    VALIDATION = "ValidationError",
}

export function errorHandler(err: Error, res?: Response): IError {
    const errorMap: IError = {
        message: err.message,
        name: err.name,
        status: 500,
        ...err,
    };

    switch (err.name) {
        case SERVICE_ERRORS.MALFORMED:
        case SERVICE_ERRORS.CAST:
        case SERVICE_ERRORS.VALIDATION:
            errorMap.status = 400;
            break;
        case SERVICE_ERRORS.DOCUMENT_NOT_FOUND:
            errorMap.status = 404;
            break;
        case SERVICE_ERRORS.FAILED_LOGIN:
            errorMap.status = 401;
            break;
        case SERVICE_ERRORS.LIMIT_FILE_SIZE:
            errorMap.status = 422;
            break;
        case SERVICE_ERRORS.UNAUTHENTICATED:
            errorMap.status = 403;
            break;
        case SERVICE_ERRORS.USERNAME_UNAVAILABLE:
        case SERVICE_ERRORS.PARALLEL_SAVE:
            errorMap.status = 409;
            break;
        case SERVICE_ERRORS.UNSUPPORTED_FILETYPE:
            errorMap.status = 415;
            break;
        default:
            errorMap.status = 500;
            break;
    }

    if (res) {
        res.status(errorMap.status).send(errorMap);
    }
    return errorMap;
}
