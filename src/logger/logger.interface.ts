import { Logger } from "tslog";

export interface ILogger {
    logger: Logger<ILogger>;

    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warning: (...args: unknown[]) => void;
}