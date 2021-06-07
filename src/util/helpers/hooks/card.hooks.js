import {useState, useEffect } from "react";
import axios from "axios";
import {accountId} from "static";

export const useCardData = (postLinearId) =>{
	const [isLoading, setIsLoading] useState(true)
	const [response,setResponse] = useState(null)
	const [error, setError] = useState(null)

	const getData = () =>{
		axios.get(`card/${postLinearId}`).
		then(async (res)=>{
			let data = res.data
			let postRepresentComments = await axios.get(`card/comments/${postLinearId}`)
			let postSummarizedContents = await axios.get(`card/contents/${postLinearId}`)
			let postUpvotes await axios.get(`votes/post/${postLinearId}`)
			let userDetails = await axios.get(`auth/user/${accountId}`)
			data.upvotes = postUpvotes.data
			data.contents = postSummarizedContents
			data.comments = postRepresentComments.data
			data.user = userDetails.data[0]
			setResponse(data)
		})
		.catch(err=>{
			setError(err)
		})
		.finally(()=>{
			setIsLoading(false)
		})
	}
	useEffect(()=>{
		getData()
	},[])
	return {response,error,isLoading}
}