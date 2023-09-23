import { isEmpty } from 'lodash';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CLIENT_DEFAULT_OPTIONS, SUI_ENV, SUI_PACKAGE_ADDRESS, GROFI_PACKAGE_ADDRESS, VALIDATOR_ADDRESS_DEFAULT } from './constant';

export const convertMistToSui = (balance) => {
    const balanceInSui = balance / 1_000_000_000;
    return Math.round(balanceInSui * 100) / 100;
};

export const convertSuiToMist = (balance) => {
    return balance * 1_000_000_000;
};

export const obfuscateUid = (uid) => {
    return `${uid.slice(0, 5)}...${uid.slice(-5)}`;
};

export const getOsuiObjects = async (wallet) => {
    if (!wallet || !wallet.address) {
        return [];
    }

    const suiClient = new SuiClient({ url: getFullnodeUrl(SUI_ENV) });
    const objects = await suiClient.getOwnedObjects({ owner: wallet.address });

    const gasObjects = await Promise.all(
        objects?.data?.map(async ({ data: objectId }) => {
            const object = await suiClient.getObject({
                id: objectId.objectId,
                options: CLIENT_DEFAULT_OPTIONS
            });

            if (object.data?.type.endsWith('::stake::GrofiStakedSui')) {
                return object.data;
            }
        })
    );

    return gasObjects.filter((gasObject) => !isEmpty(gasObject));
};

export const getGasObjects = async (wallet) => {
    if (!wallet || !wallet.address) {
        return [];
    }

    const suiClient = new SuiClient({ url: getFullnodeUrl(SUI_ENV) });
    const objects = await suiClient.getOwnedObjects({ owner: wallet.address });

    const gasObjects = await Promise.all(
        objects?.data?.map(async ({ data: objectId }) => {
            const object = await suiClient.getObject({
                id: objectId.objectId,
                options: CLIENT_DEFAULT_OPTIONS
            });

            if (object.data?.type.endsWith('::sui::SUI>')) {
                return object.data;
            }
        })
    );

    return gasObjects.filter((gasObject) => !isEmpty(gasObject));
};

export const getBiggestGasObject = async (wallet) => {
    const gasObjects = await getGasObjects(wallet);

    return gasObjects.reduce((max, current) => {
        const currentBalance = current.content?.fields?.balance ?? 0;
        const maxBalance = max.content?.fields?.balance ?? 0;

        return Number(currentBalance) > Number(maxBalance) ? current : max;
    }, 0);
};

export const getObjectsCreatedFromTxResult = (result) => result.objectChanges?.filter(({ type }) => type === 'created');

export const stakeSui = async (wallet, amount) => {
    const tx = new TransactionBlock();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(amount)]);

    tx.moveCall({
        target: `${SUI_PACKAGE_ADDRESS}::sui_system::request_add_stake`,
        arguments: [tx.pure('0x5'), coin, tx.pure(VALIDATOR_ADDRESS_DEFAULT)]
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
};

export const unstakeSui = async (wallet, stakedSuiId) => {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${SUI_PACKAGE_ADDRESS}::sui_system::request_withdraw_stake`,
        arguments: [tx.pure('0x5'), tx.object(stakedSuiId)]
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
};

export const wrapStakedSui = async (wallet, stakedSuiId) => {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${GROFI_PACKAGE_ADDRESS}::stake::create_wrapped_staked_sui`,
        arguments: [tx.object(stakedSuiId)]
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
};

export const unwrapStakedSui = async (wallet, wrappedStakedSuiId) => {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${GROFI_PACKAGE_ADDRESS}::stake::destroy_wrapped_staked_sui`,
        arguments: [tx.object(wrappedStakedSuiId)]
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
};
