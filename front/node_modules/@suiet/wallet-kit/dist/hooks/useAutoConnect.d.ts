import { ConnectionStatus, IWallet } from "../types";
export declare function useAutoConnect(select: (name: string) => Promise<void>, status: ConnectionStatus, allAvailableWallets: IWallet[], autoConnect: boolean): void;
