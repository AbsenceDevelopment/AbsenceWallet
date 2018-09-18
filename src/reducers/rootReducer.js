import { combineReducers } from 'redux';
import password from './passwordReducer';
import wallets from './walletReducer';
import initialLogin from './appStateReducer.js';

export default combineReducers({
 wallets,
 password,
 initialLogin
});
