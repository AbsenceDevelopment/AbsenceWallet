import {
  ADD_PASSWORD,
} from '../actions/passwordActions'

export default function password(state = [], action) {
  switch (action.type) {
    case ADD_PASSWORD:
      return action.data
    default:
      return state
  }
}
