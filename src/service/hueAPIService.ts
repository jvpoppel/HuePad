import {WebElements} from "../static/webElements";
import {BaseModal} from "../static/baseModal";
import {LocalStorage} from "../static/localStorage";
import {HueAccount} from "./hueAccount";
import {Logger} from "../util/logger";
import {Session} from "../static/session";

export class HueAPIService {

    private static API_URL(): string { return 'http://' + HueAccount.ip() + '/api'; }

    private static async discoverBridges() {
        let response = [];
        await fetch("https://discovery.meethue.com/").then(
            (resp) => resp.json().then(
                function (data) {
                    for (const value of data) {
                        Logger.getLogger().info("Discovered bridge on ip: " + value.internalipaddress);
                        response.push(value.internalipaddress);
                    }
                    return response;
                }));
        return response;
    }

    public static fetchAllBridges() {
        let bridgeSelect = WebElements.BRIDGE_SELECT_DROPDOWN;
        this.discoverBridges().then(bridges => {
                for (let bridge of bridges) {
                    bridgeSelect.append($('<option>', {
                        value: bridge,
                        text: bridge
                    }));
                }
            }
        )
    }

    private static async POSTCreateNewAccount() {
        let account: string = 'HuePadApp#Account';

        LocalStorage.setBridgeIP(WebElements.BRIDGE_SELECTED_IP().text());
        BaseModal.hide(WebElements.IP_MODAL);
        BaseModal.show(WebElements.BRIDGE_LINK);

        let result: string;

        let linked = false;
        while (!linked) {
            await fetch(this.API_URL(), {
                method: 'POST',
                body: JSON.stringify({"devicetype": account})
            }).then(
                (resp) => resp.json().then(
                    async function (data) {
                        Logger.getLogger().debug(data);
                        try {
                            result = data[0].success.username; // If empty response this will throw error
                            linked = true;
                        } catch (Error) {
                            // To avoid DDOS-ing the bridge; use time-out here.
                            Logger.getLogger().info("Link button press not yet registered, wait 1.5s and try again.");
                            await new Promise(resolve => setTimeout(resolve, 1500));
                        }
                    }));
        }

        LocalStorage.setBridgeUser(result);

        BaseModal.hide(WebElements.BRIDGE_LINK);
        BaseModal.show(WebElements.BRIDGE_SUCCESS);

        HueAPIService.updateSessionLights();
    }

    public static async createAccountOnIP() {
        this.POSTCreateNewAccount().then(() => Logger.getLogger().info("Account creation on bridge finished"));
    }

    private static async PUTSetLightState(light: number, body: string) {
        let url: string = this.API_URL() + '/' + HueAccount.username() + '/lights/' + light + '/state';

        await fetch(url, {
            method: 'PUT',
            body: body
        });
    }

    public static async setLightState(light: number, body: string) {
        Logger.getLogger().debug("START setLightState for light " + light);
        await this.PUTSetLightState(light, body).then(() =>
            Logger.getLogger().debug("END setLightState for light " + light));
    }

    private static async GETSessionLights() {
        let url: string = this.API_URL() + '/' + HueAccount.username() + '/lights';
        let response: string[] = [];
        await fetch(url).then(
            (resp) => resp.json().then(
                function (data) {
                    response = Object.keys(data);
                }));
        return response;
    }

    public static async updateSessionLights() {
        if (!(Session.get().lights().length == 0)) {
            return;
        }
        await this.GETSessionLights().then(function (keys) {
            keys.forEach(function (key: string) {
                Session.get().newLight(+key);
            });
        });
    }
}
