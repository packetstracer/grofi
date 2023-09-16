import { IWalletAdapter } from "../types/wallet";
import { StandardConnectOutput, StandardEventsListeners, StandardEventsNames, StandardConnectInput, Wallet, SuiSignTransactionBlockInput, SuiSignAndExecuteTransactionBlockInput, SuiSignAndExecuteTransactionBlockOutput, SuiSignTransactionBlockOutput, SuiSignMessageInput, SuiSignMessageOutput } from "@mysten/wallet-standard";
export declare enum FeatureName {
    STANDARD__CONNECT = "standard:connect",
    STANDARD__DISCONNECT = "standard:disconnect",
    STANDARD__EVENTS = "standard:events",
    SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = "sui:signAndExecuteTransactionBlock",
    SUI__SIGN_TRANSACTION_BLOCK = "sui:signTransactionBlock",
    SUI__SIGN_MESSAGE = "sui:signMessage"
}
/**
 * Wrap the adapter that supports wallet-standard
 * provider universal interfaces to component usage
 */
export declare class WalletAdapter implements IWalletAdapter {
    private standardWalletAdapter;
    constructor(standardWalletAdapter: Wallet);
    get name(): string;
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get version(): "1.0.0";
    get accounts(): readonly import("@mysten/wallet-standard").WalletAccount[];
    get chains(): import("@mysten/wallet-standard").IdentifierArray;
    get features(): any;
    connect(input: StandardConnectInput | undefined): Promise<StandardConnectOutput>;
    disconnect(): Promise<void>;
    on(event: StandardEventsNames, listener: StandardEventsListeners[StandardEventsNames]): () => void;
    signAndExecuteTransactionBlock(input: SuiSignAndExecuteTransactionBlockInput): Promise<SuiSignAndExecuteTransactionBlockOutput>;
    signTransactionBlock(input: SuiSignTransactionBlockInput): Promise<SuiSignTransactionBlockOutput>;
    signMessage(input: SuiSignMessageInput): Promise<SuiSignMessageOutput>;
    hasFeature(name: string): boolean;
    private getFeature;
}
