/**
 * @author Johan van Poppel ( https://github.com/jvpoppel/HueScripts )
 */

import { Sequence } from "./sequence";

/**
 * HueScripts Page Class
 * A page binds a sequence to a certain ID
 * @param id Page ID
 *
 */
export class Page {

    private readonly id: number;
    private sequence: Sequence;

    constructor(id: number) {
        this.id = id;
        this.sequence = new Sequence();
    }

    public getSequence(): Sequence {
        return this.sequence;
    }

    public setSequence(sequence: Sequence): Page {
        this.sequence = sequence;
        return this;
    }

    public getID(): number {
        return this.id;
    }


    public toString(): string {
        return String(this.id);
    }
}