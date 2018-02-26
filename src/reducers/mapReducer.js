export default(state = {height: 0, width: 0}, action) => {
    switch(action.type) {
        case 'SET_MAP_DIMENSIONS':
            return {...state, height: action.payload.height, width: action.payload.width}
        default: 
            return state
    }
}