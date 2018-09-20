import {
  UPDATE_INITIAL,
  ETH_PRICE_UPDATE
} from '../actions/appStateActions'

export function initialLogin(state = [], action) {
  switch (action.type) {
    case UPDATE_INITIAL:
      return action.data
    default:
      return state
  }
}

export function ethereumPrice(state = [], action) {
  switch (action.type) {
    case ETH_PRICE_UPDATE:
      return action.data
    default:
      return state
  }
}
