import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	logger: Logger<ILogger>;

	constructor() {
		this.logger = new Logger({
			prettyLogTemplate:
				'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{filePathWithLine}}{{name}}]\t',
			prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}',
			prettyErrorStackTemplate: '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
			prettyErrorParentNamesSeparator: ':',
			prettyErrorLoggerNameDelimiter: '\t',
			stylePrettyLogs: true,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warning(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
