/**
 * Enum-ish implementation for getting all jQuery selectors in other classess.
 */
export class WebElements {


    /*
            MAIN PAGE
     */
    static readonly PRIJS_BUTTON: JQuery<HTMLButtonElement> = $("#PRIJS");
    static readonly PRICE_BUTTON: JQuery<HTMLButtonElement> = $("#PRICE");
    static readonly APP_BUTTON: JQuery<HTMLButtonElement> = $("#APPLAUS");
    static readonly LACH_BUTTON: JQuery<HTMLButtonElement> = $("#LACHEN");
    static readonly SPANNEND_BUTTON: JQuery<HTMLButtonElement> = $("#SPANNEND");
    static readonly IMPOSSIBLE_BUTTON: JQuery<HTMLButtonElement> = $("#IMPOSSIBLE");
    static readonly TADA_BUTTON: JQuery<HTMLButtonElement> = $("#TADA");
    static readonly EIND_BUTTON: JQuery<HTMLButtonElement> = $("#EIND");
    static readonly STOP_BUTTON: JQuery<HTMLButtonElement> = $("#STOP");

    static readonly PRIJS_AUDIO: JQuery<HTMLAudioElement> = $("#prijsAudio");
    static readonly PRICE_AUDIO: JQuery<HTMLAudioElement> = $("#priceAudio");
    static readonly APP_AUDIO: JQuery<HTMLAudioElement> = $("#appAudio");
    static readonly LACH_AUDIO: JQuery<HTMLAudioElement> = $("#lachAudio");
    static readonly SPANNEND_AUDIO: JQuery<HTMLAudioElement> = $("#spannendAudio");
    static readonly IMPOSSIBLE_AUDIO: JQuery<HTMLAudioElement> = $("#impossibleAudio");
    static readonly TADA_AUDIO: JQuery<HTMLAudioElement> = $("#tadaAudio");
    static readonly EIND_AUDIO: JQuery<HTMLAudioElement> = $("#eindAudio");

    /*
            MODALS
     */
    static readonly IP_MODAL: JQuery<HTMLElement>       = $('#ipModal');
    static readonly BRIDGE_LINK: JQuery<HTMLElement>    = $('#bridgeModal');
    static readonly BRIDGE_SUCCESS: JQuery<HTMLElement> = $('#successModal');

    /*
            IP MODAL
     */
    static readonly BRIDGE_SELECT_DROPDOWN: JQuery<HTMLElement> = $('#bridgeSelect');
    static readonly BRIDGE_SELECT_CONFIRM: JQuery<HTMLElement> = $('#btnBridgeSelect');
    static BRIDGE_SELECTED_IP(): JQuery<HTMLElement> { return $('#bridgeSelect :selected'); }


    static readonly ROLL_BUTTON: JQuery<HTMLButtonElement> = $("#ROLL");
    static readonly RESET_BUTTON: JQuery<HTMLButtonElement> = $("#RESET");
    static readonly ITEM: JQuery<HTMLSpanElement> = $("#ITEM");
}
