/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

import { CommandType, LightCommand } from "./lightCommand";
import {HueAPIService} from "../../service/hueAPIService";
import {Logger} from "../../util/logger";
import {Session} from "../../static/session";

/**
 * HueScripts BrightnessCommand Class
 * Implementation of the LightCommand interface, specifying a brightness change for a light
 */
export class BrightnessCommand implements LightCommand {
    values: any[];
    light: number;
    type: CommandType;
    forTest: boolean;
    transitionTime: string;

    constructor(light: number, values: any[], forTest: boolean = false) {
        if (values.length == 0) {
            throw Error("BrightnessCommand had no values");
        }
        if (values.length > 2) {
            throw Error("BrightnessCommand had too many values");
        }
        this.light = light;
        this.values = values;
        this.type = CommandType.BRIGHTNESS;
        this.forTest = forTest;

        // Length can only be 1 or 2 because of validation in constructor.
        if (this.values.length == 1) {
            this.transitionTime = "";
        } else {
            this.transitionTime = "" + this.values[1];
        }

        if (forTest) {
            Logger.getLogger().warn("BrightnessCommand created for testing.");
        }
    }

    public execute(): boolean {

        let payload;

        // Length can only be 1 or 2 because of validation in constructor.
        if (this.values.length == 1) {
            payload = {"bri": +this.values[0]};
        } else {
            payload = {"bri": +this.values[0], "transitiontime": +this.values[1]};
        }


        Logger.getLogger().debug("Send payload " + JSON.stringify(payload) + " to light " + this.light);

        // In testing, exclude the API service as this will not work.
        if (!this.forTest) {
            if (this.light == -1) {
                Session.get().lights().forEach(value => HueAPIService.setLightState(value, JSON.stringify(payload)));
            } else {
                HueAPIService.setLightState(this.light, JSON.stringify(payload));
            }
        }

        return true;

    }

    public formattedValuesWithoutTransition(): string {
        return "" + this.values[0];
    }

    public getTransitionTime(): string {
        return this.transitionTime;
    }

    public toString(): string {
        return "BrightnessCommand for light |" + this.light + "|, values |" + this.values.toString();
    }

}
