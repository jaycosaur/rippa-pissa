import { API } from "aws-amplify";

export const postReview = ({toiletId, rating}) => {
    return {
        type:"POST_REVIEW",
        payload: API.post("reviews", `/toilet/${toiletId}`, {body: {rating: rating}})
    }
}

export const getRating = ({toiletId}) => {
    return {
        type:"GET_RATING",
        payload: API.get("reviews", `/toilet/${toiletId}/rating`)
    }
}