import {LocalStorage} from "../static/localStorage";

export class HueLink {
    private static instance: HueLink;

    bridgeIP: string;
    username: string;
    bridge: any;
    user: any;

    private constructor() {
        this.bridgeIP = LocalStorage.bridgeIP();
        this.username = LocalStorage.bridgeUser();
    }

    public static getInstance(): HueLink {
        if (HueLink.instance == null) {
            HueLink.instance = new HueLink();
        }
        return HueLink.instance;
    }

    public sendCommand(light: number, payload: any): HueLink {
        this.user.setLightState(light, payload);
        return this;
    }
}
