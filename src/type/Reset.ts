import {OnCommand} from "../data/events/onCommand";
import {OffCommand} from "../data/events/offCommand";
import {ColorCommand} from "../data/events/colorCommand";
import {BrightnessCommand} from "../data/events/brightnessCommand";

export class Reset {

    private static instance: Reset;

    public static execute() {
        if (Reset.instance == null) {
            Reset.instance = new Reset();
        }
        Reset.instance.actions();
    }

    private async actions() {
        new OnCommand(-1, []).execute();
        await this.sleep(1500);
        new OffCommand(6, []).execute();
        await this.sleep(3000);
        new ColorCommand(-1, ColorCommand.xy(255, 170, 0).concat(10)).execute();
        await this.sleep(100);
        new BrightnessCommand(-1, [255]).execute();

    }

    /**
     * Sleep function, as written by StackOverflow user Dan Dascelescu at https://stackoverflow.com/a/39914235.
     * @param ms Timeout in milliseconds
     * @return promise that is only fulfilled after @param ms time
     */
    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
