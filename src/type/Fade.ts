import {WebElements} from "../static/webElements";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";
import {Main} from "../main";
import {Session} from "../static/session";

export class Fade {

    private static instance: Fade;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Fade.instance == null) {
            Fade.instance = new Fade();
        }
        return Fade.instance;
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

    private changeColor(color: number[]) {
        new ColorCommand(-1, ColorCommand.xy(color[0], color[1], color[2])).execute();
    }

    private colorChanged(old: number[]): boolean {
        let now: number[] = Session.get().getCurrentColor();

        return (old[0] != now[0]) || (old[1] != now[1]) || (old[2] != now[2]);

    }

    private async fade(light: number) {
        new BrightnessCommand(light, [255]).execute();
        await this.sleep(100);
        new BrightnessCommand(light, [120, 20]).execute();
    }

    private async hueLoop() {
        let currentColor: number[] = Session.get().getCurrentColor();
        this.changeColor(currentColor);
        new BrightnessCommand(-1, [120]).execute();

        while (!this.stopped) {
            this.fade(5);
            await this.sleep(3000);

            if (this.stopped) {
                break;
            }
            if (this.colorChanged(currentColor)) {
                currentColor = Session.get().getCurrentColor();
                this.changeColor(currentColor);
            }
            this.fade(4);
            await this.sleep(3000);

            if (this.stopped) {
                break;
            }
            if (this.colorChanged(currentColor)) {
                currentColor = Session.get().getCurrentColor();
                this.changeColor(currentColor);
            }

            this.fade(1);
            this.fade(2);
            await this.sleep(3000);

            if (this.stopped) {
                break;
            }
            if (this.colorChanged(currentColor)) {
                currentColor = Session.get().getCurrentColor();
                this.changeColor(currentColor);
            }
        }
        this.stopped = false;
        this.started = false;
    }
}
