import {WebElements} from "../static/webElements";
import {Main} from "../main";
import {ColorCommand} from "../data/events/colorCommand";
import {Colors} from "../util/colors";
import {BrightnessCommand} from "../data/events/brightnessCommand";

export class Spannend {
    private static instance: Spannend;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Spannend.instance == null) {
            Spannend.instance = new Spannend();
        }
        return Spannend.instance;
    }

    public start() {
        Main.stopAllAudio();
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
        new ColorCommand(-1, Colors.convertRGBtoXY(0, 0, 125).concat(50)).execute();
        while (!this.stopped) {
            await this.sleep(3000);
            if (this.stopped) {
                break;
            }
            new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 120).concat(50)).execute();
            await this.sleep(1000);
            new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 120).concat(50)).execute();
            await this.sleep(1000);
            new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 120).concat(50)).execute();
            new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 120).concat(50)).execute();
            await this.sleep(100);
            if (this.stopped) {
                break;
            }
            new ColorCommand(-1, Colors.convertRGBtoXY(0, 0, 125).concat(20)).execute();
        }
        this.stopped = false;
        this.started = false;
    }
}
