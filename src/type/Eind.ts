import {WebElements} from "../static/webElements";
import {Main} from "../main";
import {OnCommand} from "../data/events/onCommand";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";
import {Colors} from "../util/colors";
import {OffCommand} from "../data/events/offCommand";

export class Eind {

    private static instance: Eind;
    private stopped: boolean;
    private started: boolean;

    private constructor() {
        this.stopped = false;
        this.started = false;
    }

    public static get() {
        if (Eind.instance == null) {
            Eind.instance = new Eind();
        }
        return Eind.instance;
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

    private async reset() {
        new OnCommand(-1, []).execute();
        await this.sleep(1500);
        new OffCommand(6, []).execute();
        await this.sleep(3000);
        new ColorCommand(-1, ColorCommand.xy(255, 170, 0).concat(10)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [255]).execute();
        this.stopped = false;
        this.started = false;
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
        await this.sleep(1900);
        new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2600);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        await this.sleep(2700);
        new ColorCommand(1, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(2, Colors.convertRGBtoXY(0, 255, 0).concat([23])).execute();
        new ColorCommand(4, Colors.convertRGBtoXY(0, 0, 255).concat([23])).execute();
        new ColorCommand(5, Colors.convertRGBtoXY(255, 0, 0).concat([23])).execute();

        if (this.stopped) {
            await this.reset();
            return;
        }

        // --- //
        await this.sleep(1900);
        new ColorCommand(-1, Colors.convertRGBtoXY(255, 170, 0).concat([25])).execute();

        await this.sleep(3500);
        new ColorCommand(-1, Colors.convertRGBtoXY(255, 255, 255).concat([40])).execute();
        await this.sleep(12000);
        new OffCommand(-1, []).execute();

        while (!this.stopped) {
            await this.sleep(500);
        }
        await this.reset();
    }
}
