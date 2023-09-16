import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    staked: 0,
    minted: 0,
    rewards: 0,
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
        },

        addStakedObject(state, action) {
            state.stakedList = [...state.stakedList, action.payload];
        }
    }
});

export default stake.reducer;

export const { resetStake, setStake, addGrofiObject, addStakedObject } = stake.actions;

// export function getMenu() {
//     return async () => {
//         try {
//             const response = await axios.get('/api/menu/widget');
//             dispatch(menu.actions.getMenuSuccess(response.data.widget));
//         } catch (error) {
//             dispatch(menu.actions.hasError(error));
//         }
//     };
// }
