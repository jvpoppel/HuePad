import {LocalStorage} from "../static/localStorage";
import {WebElements} from "../static/webElements";
import {BaseModal} from "../static/baseModal";
import {HueAPIService} from "./hueAPIService";

export class HueAccount {

    public static username(): string | null {
        return LocalStorage.bridgeUser();
    }

    public static ip(): string | null {
        return LocalStorage.bridgeIP();
    }

    public static exists(): boolean {
        return !((LocalStorage.bridgeUser() == null) || (LocalStorage.bridgeIP() == null));
    }

    public static create(): void {
        HueAPIService.fetchAllBridges();
        BaseModal.show(WebElements.IP_MODAL);
    }
}
