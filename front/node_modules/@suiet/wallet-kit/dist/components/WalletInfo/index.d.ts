import './index.scss';
import { Extendable } from '../../types/utils';
import { BaseError } from "../../errors";
export declare type ConnectButtonProps = Extendable & {
    label?: string;
    onDisconnectSuccess?: (walletName: string) => void;
    onDisconnectError?: (error: BaseError) => void;
};
declare function WalletInfo(props: ConnectButtonProps): JSX.Element | null;
export default WalletInfo;
