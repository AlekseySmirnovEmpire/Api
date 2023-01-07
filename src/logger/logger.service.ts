import { Logger } from 'tslog';

export class LoggerService {
    private logger: Logger<LoggerService>;

    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{filePathWithLine}}{{name}}]\t",
            prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
            prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
            prettyErrorParentNamesSeparator: ":",
            prettyErrorLoggerNameDelimiter: "\t",
            stylePrettyLogs: true,
        });
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args);
    }

    warning(...args: unknown[]) {
        this.logger.warn(...args);
    }
}