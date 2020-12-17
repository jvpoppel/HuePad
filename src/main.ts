import {WebElements} from "./static/webElements";
import {HueAccount} from "./service/hueAccount";
import {HueAPIService} from "./service/hueAPIService";
import {Session} from "./static/session";
import {Prijs} from "./type/Prijs";

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

    /**
     * This method will bind all event listeners to the DOM model
     */
    private setupBaseEventListeners() {

        WebElements.BRIDGE_SELECT_CONFIRM.get()[0].addEventListener("click", (e: Event) => HueAPIService.createAccountOnIP());
        WebElements.PRIJS_BUTTON.get()[0].addEventListener("click", (e:Event) => Prijs.get().start());
        WebElements.STOP_BUTTON.get()[0].addEventListener("click", (e:Event) => Prijs.get().stop());
    }
}
