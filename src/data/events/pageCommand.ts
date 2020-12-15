/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

import { CommandType, LightCommand } from "./lightCommand";
import {Logger} from "../../util/logger";

/**
 * HueScripts PageCommand Class
 * Implementation of the LightCommand interface, referencing another page to add all commands from starting at the specified time.
 */
export class PageCommand implements LightCommand {
    values: any[];
    light: number; // Not used in this command and thus will be null.
    type: CommandType;
    forTest: boolean;

    constructor(values: any[], forTest: boolean = false) {
        if (values.length != 1) {
            throw Error("PageCommand had invalid amount of values");
        }
        if (values[0] < 1 || values[0] > 6) {
            throw Error("PageCommand value was not an integer in set {1 ... 6}");
        }
        this.values = values;
        this.type = CommandType.PAGE;
        this.forTest = forTest;

        if (forTest) {
            Logger.getLogger().warn("PageCommand created for testing.");
        }
    }

    /**
     * Execute command will not do anything when executed.
     * This because the command will be "executed" on Queue parsing.
     */
    public execute(): boolean {

        return true;

    }

    public formattedValuesWithoutTransition(): string {
        return "" + this.values[0];
    }

    public getTransitionTime(): string {
        return "";
    }

    public toString(): string {
        return "PageCommand for page |" + this.values[0];
    }

}
