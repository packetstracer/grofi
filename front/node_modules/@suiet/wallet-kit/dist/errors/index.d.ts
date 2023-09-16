export declare enum ErrorCode {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    KIT__UNKNOWN_ERROR = "KIT.UNKNOWN_ERROR",
    WALLET__UNKNOWN_ERROR = "WALLET.UNKNOWN_ERROR",
    WALLET__CONNECT_ERROR = "WALLET.CONNECT_ERROR",
    WALLET__CONNECT_ERROR__USER_REJECTED = "WALLET.CONNECT_ERROR.USER_REJECTED",
    WALLET__DISCONNECT_ERROR = "WALLET.DISCONNECT_ERROR",
    WALLET__SIGN_TX_ERROR = "WALLET.SIGN_TX_ERROR",
    WALLET__SIGN_MSG_ERROR = "WALLET.SIGN_MSG_ERROR",
    WALLET__LISTEN_TO_EVENT_ERROR = "WALLET.LISTEN_TO_EVENT_ERROR",
    WALLET__METHOD_NOT_IMPLEMENTED_ERROR = "WALLET.METHOD_NOT_IMPLEMENTED_ERROR"
}
export declare class BaseError extends Error {
    code: ErrorCode;
    details: Record<string, any> | undefined;
    constructor(message: string, code?: ErrorCode, details?: Record<string, any>);
    formatErrorStr(code: string, message: string, details?: Record<string, any>): string;
}
export declare class KitError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: Record<string, any>);
}
export declare class WalletError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: Record<string, any>);
}
export declare class WalletNotImplementError extends WalletError {
    constructor(method: string);
}
