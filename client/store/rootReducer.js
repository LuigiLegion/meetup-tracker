// Imports
import {combineReducers} from 'redux'

import userReducer from './reducers/userReducer'
import meetupsReducer from './reducers/meetupsReducer'
import layoutReducer from './reducers/layoutReducer'

// Initializations
const rootReducer = combineReducers({
  user: userReducer,
  meetups: meetupsReducer,
  layout: layoutReducer
})

// Exports
export default rootReducer
