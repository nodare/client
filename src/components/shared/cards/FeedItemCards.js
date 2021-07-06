import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button,Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShare } from '@fortawesome/free-solid-svg-icons'

import { ProfileImageSmall } from "components/shared/images/ProfileImage";
import PostContentsComponent from 'components/common/posts/PostContents'
import UpvoteButton from 'components/shared/buttons/UpvoteButton'
import CommentsButton from 'components/shared/buttons/CommentsButton'

import { serverUrl } from 'static'
import { useActiveUserDetails } from 'util/helpers/hooks/user.hooks'

function FeedItemCard({post, handleUpvotePost}) {
    const user = useActiveUserDetails(localStorage.getItem('token') || null)
    const [currentUser, setCurrentUser] = useState(null)
    const [postData, setPostData] = useState(null)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [showComment, setShowComment] = useState(false)
    
    useEffect(() => {
        setPostData(post)
    }, [postData])

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
        map(postData?.upvotes ,  upvote=>{
            if(upvote?.user_id === currentUser.linear_id){
                setIsUpvoted(true)
            }
        })
    }, [currentUser])

    const upvotePost = () => {
        setIsUpvoted(prevState => prevState = !prevState)
    }

    // show na lang ng comments 
    
    return (
        <>
            <Card className="my-2">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-left">
                            {/* <Image src={post?.image || "assets/placeholders/user-placeholder.png"} style={{height: "35px"}} roundedCircle/> */}
                            <ProfileImageSmall imageUrl={`${serverUrl}images/users/${post?.user?.linear_id}/${post?.user_current_image?.photo_orig_name}`}/>
                            <div className="px-3">
                                <span className="d-block font-weight-bold">{post?.user?.username || "no name"}</span>
                                <small>
                                    <Link to={`square/${post?.community?.linear_id}`}>
                                        {post?.community?.title} 
                                    </Link>
                                    {post?.category?.name ? `#${post?.category?.name}`: "Uncategorized"}</small>
                            </div>
                        </div>
                        <span className="text-muted"><FontAwesomeIcon icon={faEye}/> 3</span>
                    </div>
                </Card.Body>
                <Card.Body className="py-0">
                    <PostContentsComponent isPreview={true} contents={post?.contents}/>
                    {post?.contents?.length > 3 ?
                        <>
                            <Link to={`/square/${post?.community_id}/post/${post?.linear_id}`}>See more</Link>
                        </>
                    :""}
                </Card.Body>
                <Card.Body className="py-0">
                    {post.image?
                    <>
                        <Card.Img src={post?.image || "assets/placeholders/image-placeholder.png"}/>
                    </>:""}
                </Card.Body>
                <hr className="m-0"/>
                <Card.Body className="py-2">
                    <UpvoteButton
                        isUpvoted={isUpvoted}
                        handleUpvote={() => upvotePost()}
                        count={post?.upvotes?.length}
                    />
                    <CommentsButton count={post?.comments?.length} handleClick={() => setShowComment(true)}/>
                    <Button variant={"outline-primary"} size={'sm'}><FontAwesomeIcon icon={faShare}/> Share</Button>
                    <LinkContainer to={`/square/${post?.community_id}/post/${post?.linear_id}`}>
                        <Button variant={"link"} size={'sm'}>View full post</Button>
                    </LinkContainer>
                </Card.Body>
                <hr className="m-0"/>
                {
                    showComment?
                        <Card.Body className="py-3">
                            <div className="d-flex justify-content-left">
                                <ProfileImageSmall imageUrl={`${serverUrl}images/users/${currentUser?.linear_id}/${currentUser?.current_image[0]?.photo_orig_name}`}/>
                                <Form.Group className="my-0">
                                    <Form.Control type="text" placeholder="Write down a comment.."/>
                                    <Form.Label className="my-0"><small>Press 'Enter' to send</small></Form.Label>
                                </Form.Group>
                            </div>
                        </Card.Body>
                    :""
                }
            </Card>
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