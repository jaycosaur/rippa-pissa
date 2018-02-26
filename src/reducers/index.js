import { combineReducers } from 'redux'

import location from './locationReducer'
import user from './userReducer'
import map from './mapReducer'


const rootReducer = combineReducers({
    location,
    user,
    map
})

export default rootReducer