import {WebElements} from "../static/webElements";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";
import {Main} from "../main";
import {OnCommand} from "../data/events/onCommand";
import {Colors} from "../util/colors";
import {OffCommand} from "../data/events/offCommand";

export class Knipper {

    private static instance: Knipper;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Knipper.instance == null) {
            Knipper.instance = new Knipper();
        }
        return Knipper.instance;
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
        new ColorCommand(-1, Colors.convertRGBtoXY(255, 255, 255)).execute();
        while (!this.stopped) {

            this.flash(5);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(2);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(4);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(1);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(5);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);
            this.flash(2);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(4);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);

            this.flash(1);
            if (this.stopped) {
                break;
            }
            await this.sleep(250);
        }
        this.stopped = false;
        this.started = false;
    }

    public async flash(id: number) {
        new OnCommand(id, []).execute();
        await this.sleep(10);
        new BrightnessCommand(id, [255, 1]).execute();
        await this.sleep(100);
        new BrightnessCommand(id, [0, 2]).execute();

        await this.sleep(300);
        new OffCommand(id, []).execute();
    }
}
