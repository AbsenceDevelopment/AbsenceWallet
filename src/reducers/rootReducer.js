import { combineReducers } from 'redux';
import password from './passwordReducer';
import wallets from './walletReducer';

export default combineReducers({
 wallets,
 password
});
