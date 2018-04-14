export default(state = {showSideBar: true,}, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDE_BAR':
            return {...state, showSideBar: action.payload||!state.showSideBar}
        default: 
            return state
    }
}