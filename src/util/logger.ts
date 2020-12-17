enum LOG_SEVERITY {
    DEBUG,
    INFO,
    WARN,
    ERROR
}

export class Logger {

    private readonly PRINT_SEVERITY: LOG_SEVERITY = LOG_SEVERITY.INFO;

    private static instance: Logger;

    private constructor() {}

    public static getLogger(): Logger {
        if (this.instance === undefined) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    public debug(message: string) {
        if (this.PRINT_SEVERITY <= LOG_SEVERITY.DEBUG) {
            console.log('%cDEBUG: ' + message, 'background: #FFFFFF; color: #000000');
        }
    }

    public info(message: string) {
        if (this.PRINT_SEVERITY <= LOG_SEVERITY.INFO) {
            console.log('%cINFO: ' + message, 'background: #6EB4FA; color: #000000');
        }
    }

    public warn(message: string) {
        if (this.PRINT_SEVERITY <= LOG_SEVERITY.WARN) {
            console.log('%cWARN: ' + message, 'background: #FFE748; color: #000000');
        }
    }

    public error(message: string) {
        if (this.PRINT_SEVERITY <= LOG_SEVERITY.ERROR) {
            console.log('%cERROR: ' + message, 'background: #FF1A12; color: #000000');
        }
    }
}
