import {WebElements} from "../static/webElements";
import {Main} from "../main";

export class TaDa {

    private static instance: TaDa;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (TaDa.instance == null) {
            TaDa.instance = new TaDa();
        }
        return TaDa.instance;
    }

    public start() {
        Main.stopAllAudio();
        if (!this.stopped) {
            this.started = true;
            WebElements.TADA_AUDIO.get(0).play();
            this.hueLoop();
        }
    }

    public stop() {
        if (this.started) {
            this.stopped = true;
            WebElements.TADA_AUDIO.get(0).pause();
            WebElements.TADA_AUDIO.get(0).currentTime = 0;
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
