import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Link } from 'react-router-dom'
import * as ta from "timeago.js";
import { LinkContainer } from 'react-router-bootstrap'
import { Card,Image,Row,Col,Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShare } from '@fortawesome/free-solid-svg-icons'
import { Button, Comment, Form, Header,Feed,Icon } from 'semantic-ui-react'
import PostContentsComponent from 'components/common/posts/PostContents'
import PostThumbnailComponent from 'components/common/posts/PostThumbnail'
import UpvoteButton from 'components/shared/buttons/UpvoteButton'
import CommentsButton from 'components/shared/buttons/CommentsButton'
import CommentsComponent from 'components/common/comments/PostCommentItem'
import { serverUrl } from 'static'
import {Label} from 'semantic-ui-react'
import { useActiveUserDetails } from 'util/helpers/hooks/user.hooks'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';

function FeedItemCard({post, handleUpvotePost}) {
    const user = useActiveUserDetails(localStorage.getItem('token') || null)
    const [currentUser, setCurrentUser] = useState(null)
    const [postUser, setPostUser] = useState(null)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [upvotes,setUpvotes] = useState(0)
    const [address,setAddress] = useState('')
    const [contents,setContents] =useState([])

    useEffect(() => {
        if(post){
            axios.get(`users/${post?.user_id}`).then((res)=>{
                setPostUser(res.data[0].username)
                axios.get(`comments/post/count/${post?.linear_id}`).then((res1)=>{
                    setUpvotes(res1.data[0].count)
                })
            })
            axios.get(`community/linear/${post.community_id}`).then((res)=>{
                setAddress(res.data[0].addr)
            })
            axios.get(`posts/contents/${post?.linear_id}`).then((res)=>{
                setContents(res.data)
            })
        }
    }, [post])

    useEffect(() => {
        if(user.isLoading === false){
            if(user.response === null){
                setCurrentUser(null)
            }else{
                setCurrentUser(user.response)
            }
        }
    }, [user])

    useEffect(() => {
        map(post?.upvotes ,  upvote=>{
            if(upvote?.user_id === currentUser?.linear_id){
                setIsUpvoted(true)
            }
        })
    }, [currentUser])

    const upvotePost = () => {
        setIsUpvoted(prevState => prevState = !prevState)
    }

    // show na lang ng comments 
    //console.log(postData)
    return (

            <>
            <Feed.Event>
            <Feed.Content>
                
                <Label as='a' color="blue" style={{margin:"3px"}} image>
        <img src='https://placekitten.com/50/50' />
        {postUser}
        </Label>
        <Label as='a' href={`/square/${address}/post/${post?.linear_id}`} style={{margin:"3px"}} color="violet">{post?.title}</Label>
        <Label as='a' href={`/square/${address}`} color="purple" style={{margin:"3px"}} image>
            {post?.community?.title}
        <Label.Detail>{ta.format(new Date(post?.created_at))}</Label.Detail>
        </Label>
            <Feed.Extra images>
                <PostThumbnailComponent contents={contents}/>
                <PostContentsComponent isPreview={true} contents={contents}/>
            </Feed.Extra>
            <Feed.Meta>
                <Feed.Like>
                <Icon name='like' onClick={() => upvotePost()} />{upvotes} Like
                </Feed.Like>
                <Label as='a' href={`/square/${address}/post/${post?.linear_id}`}>
                <Icon name='play' />
                Read more
                </Label>
            </Feed.Meta>
            </Feed.Content>
            </Feed.Event>
            </>
        
    )
}

export default FeedItemCard


    /*
        post: { 
            isLoading
            title
            author
            image
        }
    */
   
FeedItemCard.propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    handleUpvotePost: PropTypes.func
}