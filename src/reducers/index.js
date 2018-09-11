import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import location from './locationReducer'
import user from './userReducer'
import map from './mapReducer'
import display from './displayReducer'
import review from './reviewReducer'


const rootReducer = combineReducers({
    location,
    user,
    map,
    display,
    review,
    routing: routerReducer
})

export default rootReducer