import { combineReducers } from 'redux';
import password from './passwordReducer';
import wallets from './walletReducer';
import selectedWallet from './selectedWalletReducer';
import { ethereumPrice, initialLogin, selectedCurrency } from './appStateReducer';

export default combineReducers({
 wallets,
 password,
 ethereumPrice,
 selectedWallet,
 selectedCurrency,
 initialLogin
});
