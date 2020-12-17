import {WebElements} from "../static/webElements";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";

export class Prijs {

    private static instance: Prijs;
    private stopped: boolean;

    private constructor() {
        this.stopped = false;
    }

    public static get() {
        if (Prijs.instance == null) {
            Prijs.instance = new Prijs();
        }
        return Prijs.instance;
    }

    public start() {
        if (!this.stopped) {
            WebElements.PRIJS_AUDIO.get(0).play();
            this.hueLoop();
        }
    }

    public stop() {
        this.stopped = true;
        WebElements.PRIJS_AUDIO.get(0).pause();
        WebElements.PRIJS_AUDIO.get(0).currentTime = 0;
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
            new BrightnessCommand(-1, [255]).execute();
            await this.sleep(10);
            new ColorCommand(-1, ColorCommand.xy(255, 0, 0).concat(10)).execute();
            if (this.stopped) {
                break;
            }
            await this.sleep(1000);
            new BrightnessCommand(-1, [10]).execute();
            await this.sleep(10);
            new ColorCommand(-1, ColorCommand.xy(0, 0, 255).concat(10)).execute();
            if (this.stopped) {
                break;
            }
            await this.sleep(500);
        }
        new ColorCommand(-1, ColorCommand.xy(255, 170, 0).concat(10)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [255]).execute();
        this.stopped = false;
    }
}
