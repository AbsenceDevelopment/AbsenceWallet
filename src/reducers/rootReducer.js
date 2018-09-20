import { combineReducers } from 'redux';
import password from './passwordReducer';
import wallets from './walletReducer';
import selectedWallet from './selectedWalletReducer';
import { ethereumPrice, initialLogin } from './appStateReducer';

export default combineReducers({
 wallets,
 password,
 ethereumPrice,
 selectedWallet,
 initialLogin
});
