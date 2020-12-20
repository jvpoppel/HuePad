import {WebElements} from "../static/webElements";

export class Items {
    private items: Array<string>;
    private rolled: Set<string>;

    private static instance: Items;


    public static get() {
        if (this.instance == null) {
            this.instance = new Items();
        }
        return this.instance;
    }
    constructor() {
        this.reset();
    }

    private getRandomInt(max): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public reset() {
        this.items = ["EMF Reader", "Ghost Writing Book", "Spirit box", "Thermometer", "Video camera", "UV Flashlight",
        "Candle", "Crucifix", "Glow stick", "Head mounted camera", "Infrared light sensor", "Lighter", "Motion sensor",
        "Parabolic Microphone", "Salt shaker", "Sanity pills", "Smudge sticks", "Sound sensor", "Tripod"];
        WebElements.ITEM.get()[0].innerText = "";

        this.rolled = new Set<string>();
    }

    public roll(): void {
        if (this.items.length == this.rolled.size) {
            alert("Leeg");
            return;
        }

        let length: number = this.items.length;
        let index = this.getRandomInt(length);

        while (this.rolled.has(this.items[index])) {
            index = this.getRandomInt(length);
        }

        WebElements.ITEM.get()[0].innerText = this.items[index];
        this.rolled.add(this.items[index]);
        console.log(this.rolled);
     }
}
