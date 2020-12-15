/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

import { LightCommand } from "./events/lightCommand";
import {Logger} from "../util/logger";
import {ElementId} from "../util/elementId";

/**
 * HueScripts Row Class
 * A row is a combination of a command and a time
 */
export class Row {

    private readonly time: number;
    private readonly command: LightCommand;
    private readonly elementId: string;

    constructor(time: number, command: LightCommand) {

        this.time = time;
        this.command = command;
        this.elementId = ElementId.generate("Row");

        Logger.getLogger().info("Added new row: " + time + ", " + command.light + ", " + command.type.toString() + ", "+ command.values.toString());
    }

    public getCommand(): LightCommand {
        return this.command;
    }

    public getTime(): number {
        return this.time;
    }

    public html(): string {
        let light: string = "";
        if (this.command.light != undefined) {
            if (this.command.light == -1) {
                light = "All";
            } else {
                light += this.command.light;
            }
        }

        return  "<tr id='" + this.elementId + "'>" +
            "<td>" + this.getTime() + "</td>" +
            "<td>" + light + "</td>" +
            "<td>" + this.command.type + "</td>" +
            "<td>" + this.command.formattedValuesWithoutTransition() + "</td>" +
            "<td>" + this.command.getTransitionTime() + "</td>" +
            "</tr>";
    }
}
