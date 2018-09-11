export const toggleSideBar = (force) => {
    return {
        type: 'TOGGLE_SIDE_BAR',
        payload: force
    }
}

export const updateDeviceDimensions = (dimensions) => {
    return {
        type: 'SET_DISPLAY_DIMENSIONS',
        payload: dimensions
    }
}

export const focusTopSearchBar = (dimensions) => {
    return {
        type: 'TOP_SEARCH_BAR_FOCUS'
    }
}

export const blurTopSearchBar = (dimensions) => {
    return {
        type: 'TOP_SEARCH_BAR_BLUR'
    }
}

export const setMapFullScreen = () => {
    return {
        type: 'ENABLE_FULLSCREEN_MAP'
    }
}

export const disableMapFullScreen = () => {
    return {
        type: 'DISABLE_FULLSCREEN_MAP'
    }
}

export const toggleMobileMenuDisplay = () => {
    return {
        type: 'TOGGLE_MOBILE_MENU_SHOW'
    }
}

export const toggleMapTheme = () => {
    return {
        type: 'TOGGLE_MAP_THEME'
    }
}