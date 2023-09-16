import { WalletWithFeatures, StandardConnectFeature, StandardConnectMethod, StandardDisconnectMethod, StandardEventsOnMethod, SuiSignAndExecuteTransactionBlockFeature, SuiSignMessageFeature, SuiSignTransactionBlockFeature, SuiSignAndExecuteTransactionBlockMethod, SuiSignTransactionBlockMethod, SuiSignMessageMethod, StandardDisconnectFeature, StandardEventsFeature } from "@mysten/wallet-standard";
export interface IWallet {
    name: string;
    label: string;
    adapter: IWalletAdapter | undefined;
    installed: boolean | undefined;
    iconUrl: string;
    downloadUrl: {
        browserExtension?: string;
    };
}
export declare type IDefaultWallet = Omit<IWallet, keyof {
    adapter: any;
    installed: any;
}>;
export declare enum ConnectionStatus {
    DISCONNECTED = "disconnected",
    CONNECTED = "connected",
    CONNECTING = "connecting"
}
export declare type IWalletAdapter = WalletWithFeatures<StandardConnectFeature & StandardEventsFeature & SuiSignAndExecuteTransactionBlockFeature & SuiSignTransactionBlockFeature & SuiSignMessageFeature & Partial<StandardDisconnectFeature>> & {
    hasFeature: (name: string) => boolean;
    connect: StandardConnectMethod;
    disconnect: StandardDisconnectMethod;
    on: StandardEventsOnMethod;
    signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
    signTransactionBlock: SuiSignTransactionBlockMethod;
    signMessage: SuiSignMessageMethod;
};
