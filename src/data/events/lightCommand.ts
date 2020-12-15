/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

export enum CommandType {
    BRIGHTNESS = "Brightness",
    COLOR = "Color",
    ON = "On",
    OFF = "Off",
    PAGE = "Page"
}
/**
 * HueScripts LightCommand interface
 * A command is a combination of a light ID, command Type and arguments.
 */
export interface LightCommand {

    type: CommandType;
    light: number;
    values: Array<number>;

    execute(): boolean;

    toString(): string;

    getTransitionTime(): string;

    formattedValuesWithoutTransition(): string;
}
