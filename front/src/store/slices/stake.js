import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    staked: 0,
    minted: 0,
    rewards: 0,
    borrowed: 0,
    grofiList: [],
    stakedList: []
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
        },

        setStake(state, action) {
            const { staked, minted, rewards } = action.payload;

            state.staked = staked;
            state.minted = minted;
            state.rewards = rewards;
        },

        addGrofiObject(state, action) {
            state.grofiList = [...state.grofiList, action.payload];
            state.minted += Number(action.payload?.content?.fields?.balance);
            state.borrowed += Number(action.payload?.content?.fields?.borrowed);
        },

        addStakedObject(state, action) {
            state.stakedList = [...state.stakedList, action.payload];
            state.staked += Number(action.payload?.content?.fields?.principal);
        }
    }
});

export const convertBalance = (balance) => {
    const balanceInSui = Number(balance) / 1000000000;
    return Math.round(balanceInSui * 100) / 100;
};

export default stake.reducer;

export const { resetStake, setStake, addGrofiObject, addStakedObject } = stake.actions;
