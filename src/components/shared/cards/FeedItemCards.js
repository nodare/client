import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Link } from 'react-router-dom'
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
import { useActiveUserDetails } from 'util/helpers/hooks/user.hooks'
import 'semantic-ui-css/semantic.min.css'

function FeedItemCard({post, handleUpvotePost}) {
    const user = useActiveUserDetails(localStorage.getItem('token') || null)
    const [currentUser, setCurrentUser] = useState(null)
    const [postData, setPostData] = useState([])
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [showComment, setShowComment] = useState(false)
    


    useEffect(() => {
        setPostData(post)
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
            if(upvote?.user_id === currentUser.linear_id){
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
        <Feed.Event>
        <Feed.Label image='https://placekitten.com/50/50' />
        <Feed.Content>
        <Feed.Summary>
            <Feed.User>{postData?.user?.username}</Feed.User> posted {postData.title} in {postData?.community?.title}
          <Feed.Date>2 Days Ago</Feed.Date>
        </Feed.Summary>
          <Feed.Extra images>
            <PostThumbnailComponent contents={postData.contents}/>
            <PostContentsComponent isPreview={true} contents={postData.contents}/>
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' onClick={() => upvotePost()}/>{postData?.upvotes?.length} Like
            </Feed.Like>
            <LinkContainer to={`/square/${postData?.community_id}/post/${postData?.linear_id}`}>
            <Button variant={"link"} size={'sm'}>Read more</Button>
            </LinkContainer>
          </Feed.Meta>
        </Feed.Content>
        </Feed.Event>
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