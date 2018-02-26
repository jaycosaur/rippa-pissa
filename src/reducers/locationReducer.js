export default(state = {location: null, lastUpdated: null, isFetching: false, error: false, areaIsDragging: false, showArea: true, showPoint: true}, action) => {
    switch(action.type) {
        case 'SET_LOCATION':
            return {...state, location: action.payload, isGPS: false, showArea: true, showPoint: true, areaIsDragging: false, pointIsDragging: false}
        case 'DRAG_AREA_START':
            return {...state, areaIsDragging: true, showArea: true, showPoint: false}
        case 'DRAG_AREA_END':
            return {...state, areaIsDragging: false, showArea: true, showPoint: true}
        case 'DRAG_POINT_START':
            return {...state, pointIsDragging: true, showArea: false, showPoint: true}
        case 'DRAG_POINT_END':
            return {...state, pointIsDragging: false, showArea: true, showPoint: false}
        case 'FETCH_LOCATION_PENDING':
            return {...state, isFetching: true}
        case 'FETCH_LOCATION_FULFILLED':
            return {...state, location: action.payload, isFetching: false, isGPS: true, lastUpdated: new Date()}
        case 'FETCH_LOCATION_REJECTED':
            return {...state, isFetching: false, error: action.payload}
        default: 
            return state
    }
}