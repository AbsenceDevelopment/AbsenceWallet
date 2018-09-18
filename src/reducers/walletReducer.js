import {
  ADD_WALLET,
  UPDATE_WALLET
} from '../actions/walletActions'

export default function wallets(state = [], action) {
  switch (action.type) {
    case ADD_WALLET:
      return [
        ...state,
        {
          id: action.data._id,
          walletMnemonic: action.data.walletMnemonic,
          privateKey: action.data.privateKey,
          walletName: action.data.walletName
        }
      ]
    case UPDATE_WALLET:
      return state.map(wallet =>
        (wallet.id === action.data._id)
          ? action.data
          : wallet
      )
    default:
      return state
  }
}
