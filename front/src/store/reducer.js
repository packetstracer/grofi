import { combineReducers } from 'redux';

import snackbarReducer from './slices/snackbar';
import stakeReducer from './slices/stake';
import productReducer from './slices/product';
import cartReducer from './slices/cart';
import menuReducer from './slices/menu';

const reducer = combineReducers({
    snackbar: snackbarReducer,
    stake: stakeReducer,
    product: productReducer,
    cart: cartReducer,
    menu: menuReducer
});

export default reducer;
