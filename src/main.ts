import {WebElements} from "./static/webElements";
import {HueAccount} from "./service/hueAccount";
import {HueAPIService} from "./service/hueAPIService";
import {Session} from "./static/session";
import {Prijs} from "./type/Prijs";
import {Price} from "./type/Price";
import {Spannend} from "./type/Spannend";
import {Impossible} from "./type/Impossible";
import {Lachen} from "./type/Lachen";
import {Applaus} from "./type/Applaus";
import {TaDa} from "./type/TaDa";
import {Eind} from "./type/Eind";
import {Items} from "./model/Items";

$(() => {
    new Main();
})

export class Main {


    constructor() {

        if (!HueAccount.exists()) {
            HueAccount.create();
        } else {
            HueAPIService.updateSessionLights();
        }

        this.setupBaseEventListeners();
        Session.get().changeToPage(1);
    }

    public static stopAllAudio(fromButton: boolean = false) {
        Prijs.get().stop();
        Price.get().stop();
        Spannend.get().stop();
        Impossible.get().stop();
        TaDa.get().stop();
        Eind.get().stop();
        if (fromButton) {
            Lachen.get().stop();
            Applaus.get().stop();
        }
    }

    /**
     * This method will bind all event listeners to the DOM model
     */
    private setupBaseEventListeners() {

        WebElements.BRIDGE_SELECT_CONFIRM.get()[0].addEventListener("click", (e: Event) => HueAPIService.createAccountOnIP());
        WebElements.PRIJS_BUTTON.get()[0].addEventListener("click", (e:Event) => Prijs.get().start());
        WebElements.PRICE_BUTTON.get()[0].addEventListener("click", (e:Event) => Price.get().start());
        WebElements.SPANNEND_BUTTON.get()[0].addEventListener("click", (e:Event) => Spannend.get().start());
        WebElements.IMPOSSIBLE_BUTTON.get()[0].addEventListener("click", (e:Event) => Impossible.get().start());
        WebElements.LACH_BUTTON.get()[0].addEventListener("click", (e:Event) => Lachen.get().start());
        WebElements.APP_BUTTON.get()[0].addEventListener("click", (e:Event) => Applaus.get().start());
        WebElements.TADA_BUTTON.get()[0].addEventListener("click", (e:Event) => TaDa.get().start());
        WebElements.EIND_BUTTON.get()[0].addEventListener("click", (e:Event) => Eind.get().start());
        WebElements.STOP_BUTTON.get()[0].addEventListener("click", (e:Event) => Main.stopAllAudio(true));

        WebElements.ROLL_BUTTON.get()[0].addEventListener("click", (e: Event) => Items.get().roll());
        WebElements.RESET_BUTTON.get()[0].addEventListener("click", (e: Event) => Items.get().reset());
    }
}
