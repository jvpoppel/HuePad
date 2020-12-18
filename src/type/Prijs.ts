import {WebElements} from "../static/webElements";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";
import {Main} from "../main";

export class Prijs {

    private static instance: Prijs;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Prijs.instance == null) {
            Prijs.instance = new Prijs();
        }
        return Prijs.instance;
    }

    public start() {
        Main.stopAllAudio();
        if (!this.stopped) {
            this.started = true;
            WebElements.PRIJS_AUDIO.get(0).play();
            this.hueLoop();
        }
    }

    public stop() {
        if (this.started) {
            this.stopped = true;
            WebElements.PRIJS_AUDIO.get(0).pause();
            WebElements.PRIJS_AUDIO.get(0).currentTime = 0;
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
            new ColorCommand(5, ColorCommand.xy(255, 255, 0)).execute();
            new BrightnessCommand(4, [10]).execute();
            new BrightnessCommand(1, [255]).execute();
            new BrightnessCommand(2, [255]).execute();

            await this.sleep(1000);
            if (this.stopped) {
                break;
            }
            new ColorCommand(5, ColorCommand.xy(255, 0, 0)).execute();
            new BrightnessCommand(4, [255]).execute();
            new BrightnessCommand(1, [10]).execute();
            new BrightnessCommand(2, [10]).execute();
            await this.sleep(1000);
        }
        new ColorCommand(-1, ColorCommand.xy(255, 170, 0).concat(10)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [255]).execute();
        this.stopped = false;
        this.started = false;
    }
}
