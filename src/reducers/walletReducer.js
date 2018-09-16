import {
  ADD_WALLET,
} from '../actions/walletActions'

export default function wallets(state = [], action) {
  switch (action.type) {
    case ADD_WALLET:
      return [
        ...state,
        {
          privateKey: action.data.privateKey,
          walletName: action.data.walletName
        }
      ]
    default:
      return state
  }
}
