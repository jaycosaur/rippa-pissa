export const addToLocation = (location) => {
    console.log("adding location", location)
    return {
        type: 'add',
        location
    }
}

export const setLocation = (location) => {
    return {
        type: 'SET_LOCATION',
        payload: location
    }
}

export const isDraggingArea = () => {
    return {
        type: 'DRAG_AREA_START'
    }
}

export const isDraggingPoint = () => {
    return {
        type: 'DRAG_POINT_START'
    }
}

export const isEndDraggingArea = () => {
    return {
        type: 'DRAG_AREA_END'
    }
}

export const isEndDraggingPoint = () => {
    return {
        type: 'DRAG_POINT_END'
    }
}

const getLocation =  new Promise(function(resolve, reject) {
        const getLocation = () => {
          if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
            navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler)
          } else {
            console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
          }
        }
        const geolocationCallback = (location) => {
          let latitude = location.coords.latitude
          let longitude = location.coords.longitude
          resolve({lat: latitude, lng: longitude})
        }
        const errorHandler = (error) => {
            if (error.code === 1) {
              error.longMessage = "Error: PERMISSION_DENIED: User denied access to their location"
            } else if (error.code === 2) {
                error.longMessage = "Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached"
            } else if (error.code === 3) {
                error.longMessage = "Error: TIMEOUT: Calculating the user's location too took long"
            } else {
                error.longMessage = "Unexpected error code"
            }
            reject(Error(error));
          };
        getLocation()
    })

export const fetchLocation = () => {
    return {
        type:"FETCH_LOCATION",
        payload: getLocation
    }
}