import {WebElements} from "./static/webElements";
import {BaseModal} from "./static/baseModal";
import {HueAccount} from "./service/hueAccount";
import {HueAPIService} from "./service/hueAPIService";
import {Session} from "./static/session";
import {Logger} from "./util/logger";
import {CommandType} from "./data/events/lightCommand";
import {ScriptRunner} from "./static/scriptRunner";
import {PageMapParser} from "./util/pageMapParser";

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

    /*private static audioChangeEvent() {
        let files = WebElements.SOUND_FILE_INPUT().get(0).files;
        WebElements.SOUND_PLAYER().get(0).src = URL.createObjectURL(files[0]);
        WebElements.SOUND_PLAYER().get(0).load();
    }*/

    /**
     * This method will bind all event listeners to the DOM model
     */
    private setupBaseEventListeners() {

        WebElements.BRIDGE_SELECT_CONFIRM.get()[0].addEventListener("click", (e: Event) => HueAPIService.createAccountOnIP());
    }

    private Set_toJSON(key, value): any {
        if (typeof value === 'object' && value instanceof Set) {
            return Array.from(value);
        }
        return value;
    }
}
