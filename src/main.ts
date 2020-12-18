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

    public static stopAllAudio() {
        Prijs.get().stop();
        Price.get().stop();
        Spannend.get().stop();
        Impossible.get().stop();
        Lachen.get().stop();
        Applaus.get().stop();
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
        WebElements.STOP_BUTTON.get()[0].addEventListener("click", (e:Event) => Main.stopAllAudio());
    }
}
