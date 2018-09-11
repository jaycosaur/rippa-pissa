export default(state = {showSideBar: true, fullScreenMapEnabled: false, showMobileMenu: false, lightTheme: false}, action) => {
    switch(action.type) {
        case 'SET_DISPLAY_DIMENSIONS':
            let device = null
            if(action.payload.width<640){
                device="mobile"
            } else if(action.payload.width<1008){
                device="tablet"
            } else if(action.payload.width<1600){
                device="desktop"
            } else {
                device="desktop"
            }
            return {
                ...state, 
                height: action.payload.height, 
                width: action.payload.width, 
                deviceType: device
            }
        case 'TOGGLE_SIDE_BAR':
            return {...state, showSideBar: action.payload||!state.showSideBar}
        case 'TOP_SEARCH_BAR_FOCUS':
            return {...state, isTopSearchFocus: true}
        case 'TOP_SEARCH_BAR_BLUR':
            return {...state, isTopSearchFocus: false}
        case 'ENABLE_FULLSCREEN_MAP':
            return {...state, fullScreenMapEnabled: !state.fullScreenMapEnabled}
        case 'DISABLE_FULLSCREEN_MAP':
            return {...state, fullScreenMapEnabled: false}
        case 'TOGGLE_MOBILE_MENU_SHOW':
            return {...state, showMobileMenu: !state.showMobileMenu}  
        case 'TOGGLE_MAP_THEME':
            return {...state, lightTheme: !state.lightTheme}  
        default: 
            return state
    }
}

