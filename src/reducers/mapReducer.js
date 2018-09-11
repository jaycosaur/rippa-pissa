export default(state = {height: 0, width: 0}, action) => {
    switch(action.type) {
        case 'SET_MAP_DIMENSIONS':
            let device = null
            if(action.payload.width<640){
                device="mobile"
            } else if(action.payload.width<1008){
                device="tablet"
            } else if(action.payload.width<1600){
                device="desktop"
            } else {
                device="other"
            }
            return {
                ...state, 
                height: action.payload.height, 
                width: action.payload.width, 
                deviceType: device
            }
        default: 
            return state
    }
}