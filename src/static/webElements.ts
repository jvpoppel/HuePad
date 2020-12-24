/**
 * Enum-ish implementation for getting all jQuery selectors in other classess.
 */
export class WebElements {


    /*
            MAIN PAGE
     */
    static readonly KNIPPER_BUTTON: JQuery<HTMLButtonElement> = $("#KNIPPER");
    static readonly ROOD_BUTTON: JQuery<HTMLButtonElement> = $("#ROOD");
    static readonly GROEN_BUTTON: JQuery<HTMLButtonElement> = $("#GROEN");
    static readonly BLAUW_BUTTON: JQuery<HTMLButtonElement> = $("#BLAUW");
    static readonly SPANNEND_BUTTON: JQuery<HTMLButtonElement> = $("#SPANNEND");
    static readonly FADE_BUTTON: JQuery<HTMLButtonElement> = $("#FADE");
    static readonly TADA_BUTTON: JQuery<HTMLButtonElement> = $("#TADA");
    static readonly EIND_BUTTON: JQuery<HTMLButtonElement> = $("#EIND");
    static readonly STOP_BUTTON: JQuery<HTMLButtonElement> = $("#STOP");

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
}
