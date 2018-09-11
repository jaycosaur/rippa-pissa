export default(state = {isPosting: false, postError: false, reviews: {}, ratings: {}}, action) => {
    switch(action.type) {
        case 'POST_REVIEW_PENDING':
            return {...state, isPosting: true}
        case 'POST_REVIEW_FULFILLED':
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.toiletId]: {
                        ...action.payload
                    }
                },
                isPosting: false,
                lastUpdated: new Date()}
        case 'POST_REVIEW_REJECTED':
            return {...state, isPosting: false, postError: true, error: action.payload}
        case 'GET_RATING_PENDING':
            return {...state, fetchingRatings: true}
        case 'GET_RATING_FULFILLED':
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    [action.payload.toiletId]: {
                        ...action.payload,
                        fetchedOn: new Date()
                    }
                },
                fetchingRatings: false,
                lastUpdated: new Date()}
        case 'GET_RATING_REJECTED':
            return {...state, fetchingRatings: false, fetchRatingError: true, fetchingRatingsError: action.payload}
        default: 
            return state
    }
}
