import { Extendable } from '../types/utils';
import { Chain, IDefaultWallet } from "../types";
export declare type WalletProviderProps = Extendable & {
    defaultWallets?: IDefaultWallet[];
    chains?: Chain[];
    autoConnect?: boolean;
};
export declare const WalletProvider: (props: WalletProviderProps) => JSX.Element;
