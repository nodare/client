import axios from 'axios'

/* 
================================
            UPVOTES
================================
*/
export const getPostUpvoteCount = (postLinearId) => async dispatch =>{
    let res = await axios.get(`votes/post/count/${postLinearId}`)
    return dispatch({
        type:"POST_UPVOTE_COUNT",
        payload:res.data
    })
}
export const getUpvoteCount = () => async dispatch =>{
    let res = await axios.get(`votes/count`)
    return dispatch({
        type:"UPVOTE_COUNT",
        payload:res.data
    })
}
export const verifyPostUpvote = (postLinearId, userId) => async dispatch => {
    let res = await axios.get(`votes/${userId}/posts/${postLinearId}`)
    if(res.data.length === 0){
        return dispatch({
            type: "VERIFY_UPVOTE",
            payload: false
        })
    }else{
        if(res.data[0].status){
            return dispatch({
                type: "VERIFY_UPVOTE",
                payload: true
        })
        }else{
            return dispatch({
                type: "VERIFY_UPVOTE",
                payload: false
            }) 
        }

    }
}

export const togglePostUpvote = (postLinearId, userId) => async dispatch => {
    axios.get(`votes/${userId}/posts/${postLinearId}`)
    .then((res)=>{
        console.log(res)
    if(res.data?.length === 0){
        let data = {
            user_id: userId,
            post_id: postLinearId,
            status: 1
        }
        axios.post(`votes/post`, data)
    }else{
        
        let data = {
            user_id: userId,
            post_id: postLinearId,
            status: res.data[0].status?0:1
        }
        console.log(res.data[0].status?false:true)
        axios.put(`votes/post`, data).then(()=>{
            return dispatch({
                type: "TOGGLE_UPVOTE",
                payload: res.data[0].status?false:true
            })
        })
    }
    return dispatch({
        type: "TOGGLE_UPVOTE",
        payload: true
    })
})
}

// export const togglePostUpvote = () => async dispatch => {
//     let exists = await axios.get()
// }