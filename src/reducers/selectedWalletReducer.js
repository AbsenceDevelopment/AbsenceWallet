import {
  SELECT_WALLET
} from '../actions/walletActions'

export default function selectedWallet(state = [], action) {
  switch (action.type) {
    case SELECT_WALLET:
      return action.data
    default:
      return state
  }
}
