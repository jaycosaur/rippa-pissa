export default(state = {
    urgency: {distance: 500}, 
    location: {lat: -35.282, lng: 149.129}, 
    lastUpdated: null, 
    isFetching: false, 
    error: false,
    areaIsDragging: false, 
    showArea: true, 
    showPoint: true}, 
    action) => {
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
        case 'CHANGE_URGENCY_DISTANCE':
            return {...state, urgency: {...state.urgency, distance: action.payload}}
        case 'FETCH_LOCATION_PENDING':
            return {...state, isFetching: true}
        case 'FETCH_LOCATION_FULFILLED':
            return {...state, location: action.payload, isFetching: false, isGPS: true, lastUpdated: new Date()}
        case 'FETCH_LOCATION_REJECTED':
            return {...state, isFetching: false, error: action.payload}
        case 'FETCH_ITEMS_PENDING':
            return {...state, isFetchingItems: true}
        case 'FETCH_ITEMS_FULFILLED':
            return {...state, items: action.payload, isFetchingItems: false, itemsLastUpdated: new Date()}
        case 'FETCH_ITEMS_REJECTED':
            return {...state, isFetchingItems: false, itemsFetchError: action.payload}
        case 'SELECT_ITEM':
            return {...state, selectedItem: {
                key: action.payload,
                showItemInformation: true,
                info: state.items.hits[action.payload]}
            }
        case 'SHOW_INFORMATION_PANEL':
            return {
                ...state, selectedItem: {
                    ...state.selectedItem,
                    showItemInformation: action.payload
                }
            }
        default: 
            return state
    }
}