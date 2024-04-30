import {Messenger} from "./messenger";

export const ErrorHandler = (error: unknown): error is Messenger => {
    return (
        typeof error === 'object' &&
            error !== null &&
            'data' in error &&
            typeof (error as Record<string, unknown>).data === "object"
    )
}