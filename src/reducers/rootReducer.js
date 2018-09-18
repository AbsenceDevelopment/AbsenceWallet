import { combineReducers } from 'redux';
import password from './passwordReducer';
import wallets from './walletReducer';
import selectedWallet from './selectedWalletReducer';
import initialLogin from './appStateReducer';

export default combineReducers({
 wallets,
 password,
 selectedWallet,
 initialLogin
});
