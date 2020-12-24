import {WebElements} from "../static/webElements";
import {Main} from "../main";
import {Colors} from "../util/colors";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";

export class Impossible {
    private static instance: Impossible;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Impossible.instance == null) {
            Impossible.instance = new Impossible();
        }
        return Impossible.instance;
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
        new ColorCommand(-1, Colors.convertRGBtoXY(255, 0, 0)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [10, 30]).execute();
        await this.sleep(5900);
        while (!this.stopped) {
            new ColorCommand(5, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(5, [255]).execute();
            await this.sleep(60);
            new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(5, [10, 5]).execute();
            await this.sleep(600);
            if (this.stopped) {
                break;
            }
            new ColorCommand(1, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(1, [255]).execute();
            await this.sleep(60);
            new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(1, [10, 5]).execute();
            await this.sleep(600);
            if (this.stopped) {
                break;
            }
            new ColorCommand(4, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(4, [255]).execute();
            await this.sleep(60);
            new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(4, [10, 5]).execute();
            await this.sleep(600);
            if (this.stopped) {
                break;
            }

            new ColorCommand(2, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(2, [255]).execute();
            await this.sleep(60);
            new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(2, [10, 5]).execute();
            await this.sleep(600);
            if (this.stopped) {
                break;
            }
            new ColorCommand(5, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(5, [255]).execute();
            await this.sleep(60);
            new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(5, [10, 5]).execute();
            await this.sleep(600);
            if (this.stopped) {
                break;
            }
            new ColorCommand(4, Colors.convertRGBtoXY(255, 255, 255)).execute();
            new BrightnessCommand(4, [255]).execute();
            await this.sleep(60);
            new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 0).concat(5)).execute();
            new BrightnessCommand(4, [10, 5]).execute();
            await this.sleep(600);
        }
        new ColorCommand(-1, ColorCommand.xy(255, 170, 0).concat(10)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [255]).execute();
        this.stopped = false;
        this.started = false;
    }
}
