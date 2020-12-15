/**
 * Static class containing methods to get or set local storage
 */
export class LocalStorage {
    public static bridgeIP(): string | null {
        return localStorage.getItem("bridgeIP");
    }

    public static setBridgeIP(bridgeIP: string): void {
        localStorage.setItem("bridgeIP", bridgeIP);
    }

    public static bridgeUser(): string | null {
        return localStorage.getItem("bridgeUser");
    }

    public static setBridgeUser(bridgeUser: string): void {
        localStorage.setItem("bridgeUser", bridgeUser);
    }


}