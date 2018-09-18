import {
  UPDATE_INITIAL,
} from '../actions/appStateActions'

export default function initialLogin(state = [], action) {
  switch (action.type) {
    case UPDATE_INITIAL:
      return action.data
    default:
      return state
  }
}
