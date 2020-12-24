import {WebElements} from "../static/webElements";
import {Main} from "../main";

export class Applaus {
    private static instance: Applaus;
    private started: boolean;
    private stopped: boolean;

    private constructor() {
        this.started = false;
        this.stopped = false;
    }

    public static get() {
        if (Applaus.instance == null) {
            Applaus.instance = new Applaus();
        }
        return Applaus.instance;
    }

    public start() {
        if (this.started) {
            this.stop();
            return;
        }
        if (!this.stopped) {
            this.started = true;
            this.hueLoop();
        }
    }

    public stop() {
        if (this.started) {
            this.stopped = true;
        }
    }

    /**
     * Sleep function, as written by StackOverflow user Dan Dascelescu at https://stackoverflow.com/a/39914235.
     * @param ms Timeout in milliseconds
     * @return promise that is only fulfilled after @param ms time
     */
    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async hueLoop() {
        while (!this.stopped) {
            await this.sleep(1000);
        }
        this.stopped = false;
        this.started = false;
    }
}
