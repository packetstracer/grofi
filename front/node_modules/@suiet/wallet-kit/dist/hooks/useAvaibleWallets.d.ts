import { IDefaultWallet, IWallet } from "../types";
export declare const useAvailableWallets: (defaultWallets: IDefaultWallet[]) => {
    allAvailableWallets: IWallet[];
    configuredWallets: IWallet[];
    detectedWallets: IWallet[];
};
