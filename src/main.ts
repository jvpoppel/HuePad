import {WebElements} from "./static/webElements";
import {HueAccount} from "./service/hueAccount";
import {HueAPIService} from "./service/hueAPIService";
import {Session} from "./static/session";
import {Knipper} from "./type/Knipper";
import {Fade} from "./type/Fade";
import {Spannend} from "./type/Spannend";
import {Impossible} from "./type/Impossible";
import {Lachen} from "./type/Lachen";
import {Applaus} from "./type/Applaus";
import {TaDa} from "./type/TaDa";
import {Eind} from "./type/Eind";
import {Reset} from "./type/Reset";

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
        Knipper.get().stop();
        Fade.get().stop();
        Spannend.get().stop();
        Impossible.get().stop();
        TaDa.get().stop();
        Eind.get().stop();
        if (fromButton) {
            Lachen.get().stop();
            Applaus.get().stop();

            Reset.execute();
        }
    }

    /**
     * This method will bind all event listeners to the DOM model
     */
    private setupBaseEventListeners() {

        WebElements.BRIDGE_SELECT_CONFIRM.get()[0].addEventListener("click", (e: Event) => HueAPIService.createAccountOnIP());
        WebElements.KNIPPER_BUTTON.get()[0].addEventListener("click", (e:Event) => Knipper.get().start());
        WebElements.ROOD_BUTTON.get()[0].addEventListener("click", (e:Event) => Session.get().setRed());
        WebElements.SPANNEND_BUTTON.get()[0].addEventListener("click", (e:Event) => Spannend.get().start());
        WebElements.FADE_BUTTON.get()[0].addEventListener("click", (e:Event) => Fade.get().start());
        WebElements.BLAUW_BUTTON.get()[0].addEventListener("click", (e:Event) => Session.get().setBlue());
        WebElements.GROEN_BUTTON.get()[0].addEventListener("click", (e:Event) => Session.get().setGreen());
        WebElements.TADA_BUTTON.get()[0].addEventListener("click", (e:Event) => TaDa.get().start());
        WebElements.EIND_BUTTON.get()[0].addEventListener("click", (e:Event) => Eind.get().start());
        WebElements.STOP_BUTTON.get()[0].addEventListener("click", (e:Event) => Main.stopAllAudio(true));
    }
}
