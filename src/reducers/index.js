import { combineReducers } from 'redux'

import location from './locationReducer'
import user from './userReducer'
import map from './mapReducer'
import display from './displayReducer'



const rootReducer = combineReducers({
    location,
    user,
    map,
    display
})

export default rootReducer