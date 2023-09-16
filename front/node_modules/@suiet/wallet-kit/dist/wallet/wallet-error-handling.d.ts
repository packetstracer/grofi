import { ErrorCode } from "../errors";
export interface WalletErrorRes {
    code: ErrorCode;
    message: string;
    details: Record<string, any>;
}
export declare function handleConnectionError(e: Error, wallet: string): WalletErrorRes;
