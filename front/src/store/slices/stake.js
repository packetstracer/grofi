import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';

// import axios from 'utils/axios';
import axios from 'axios';

import { SUI_RPC_URL } from 'utils/sui/constant';

const initialState = {
    staked: 0,
    minted: 0,
    rewards: 0,
    borrowed: 0,
    grofiList: [],
    stakedList: [],
    epoch: {},
    error: null
};

const stake = createSlice({
    name: 'stake',
    initialState,

    reducers: {
        resetStake(state) {
            state.staked = initialState.staked;
            state.minted = initialState.minted;
            state.rewards = initialState.rewards;

            state.grofiList = initialState.grofiList;
            state.stakedList = initialState.stakedList;

            state.epoch = initialState.epoch;

            state.error = initialState.error;
        },

        setStake(state, action) {
            const { staked, minted, rewards } = action.payload;

            state.staked = staked;
            state.minted = minted;
            state.rewards = rewards;
        },

        addStake(state, action) {
            const { staked, minted, rewards } = action.payload;

            state.staked += staked;
            state.minted += minted;
            state.rewards += rewards;
        },

        addGrofiObject(state, action) {
            state.grofiList = [...state.grofiList, action.payload];
            state.minted += Number(action.payload?.content?.fields?.balance);
            state.borrowed += Number(action.payload?.content?.fields?.borrowed);
        },

        addStakedObject(state, action) {
            state.stakedList = [...state.stakedList, action.payload];
            state.staked += Number(action.payload?.content?.fields?.principal);
        },

        setEpoch(state, action) {
            state.epoch = action.payload;
        },

        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

export function getEpoch() {
    return async () => {
        try {
            const response = await axios.post(SUI_RPC_URL, {
                jsonrpc: '2.0',
                method: 'suix_getLatestSuiSystemState',
                id: 1,
                params: []
            });
            console.log(response.data);

            dispatch(stake.actions.setEpoch(response?.data?.result));
        } catch (error) {
            console.log(error);
            dispatch(stake.actions.hasError(error));
        }
    };
}

export default stake.reducer;

export const { resetStake, setStake, addStake, addGrofiObject, addStakedObject } = stake.actions;
