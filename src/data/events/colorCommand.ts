/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

import { CommandType, LightCommand } from "./lightCommand";
import {HueAPIService} from "../../service/hueAPIService";
import {Logger} from "../../util/logger";
import {Session} from "../../static/session";
import {Colors} from "../../util/colors";

/**
 * HueScripts ColorCommand Class
 * Implementation of the LightCommand interface, specifying a color change for a light
 */
export class ColorCommand implements LightCommand {
    values: any;
    light: number;
    type: CommandType;
    forTest: boolean;
    transitionTime: string;
    originalValues: number[];

    constructor(light: number, values: any, forTest: boolean = false) {

        if (values.length < 2) {
            throw Error("ColorCommand had too little values");
        }
        if (values.length > 3) {
            throw Error("ColorCommand had too many values");
        }

        this.light = light;
        this.values = values;
        this.type = CommandType.COLOR;
        this.forTest = forTest;

        // Length can only be 2 or 3 because of validation in constructor.
        if (this.values.length == 2) {
            this.transitionTime = "";
        } else {
            this.transitionTime = "" + this.values[2];
        }

        if (forTest) {
            Logger.getLogger().warn("ColorCommand created for testing.");
        }
    }

    public execute(): boolean {

        let payload;

        // Length can only be 2 or 3 because of validation in constructor.
        if (this.values.length == 2) {
            payload = {"xy": [+this.values[0], +this.values[1]]}
        } else {
            payload = {"xy": [+this.values[0], +this.values[1]], "transitiontime": +this.values[2]};
        }

        Logger.getLogger().debug("Send payload " + JSON.stringify(payload) + " to light " + this.light);

        // In testing, exclude the API service
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
        return "" + this.originalValues[0] + ", " + this.originalValues[1] + ", " + this.originalValues[2];
    }

    public getTransitionTime(): string {
        return this.transitionTime;
    }

    public setOriginalValues(values: number[]): ColorCommand {
        this.originalValues = values;
        return this;
    }

    public toString(): string {
        return "ColorCommand for light |" + this.light + "|, values |" + this.values.toString();
    }

    public static xy(red: number, green: number, blue: number): number[] {
        return Colors.convertRGBtoXY(red, green, blue);
    }
}
