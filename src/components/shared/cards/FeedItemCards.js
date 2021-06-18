import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types'
import { Card, Image, Button, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faEye, faShare } from '@fortawesome/free-solid-svg-icons'

import { ProfileImageSmall } from "components/shared/images/ProfileImage";
import PostContentsComponent from 'components/common/posts/PostContents'

import { serverUrl } from 'static'
import { useActiveUserDetails } from 'util/helpers/hooks/user.hooks'

function FeedItemCard({post}) {
    const user = useActiveUserDetails(localStorage.getItem('token') || null)
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('token'))
    const [postData, setPostData] = useState(null)
    
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
                    <Card.Img src={post?.image || "assets/placeholders/image-placeholder.png"}/>
                </Card.Body>
                <Card.Body>
                    <Button variant={"outline-link"}><FontAwesomeIcon icon={faThumbsUp}/> 123</Button>
                    <Button variant={"outline-link"}><FontAwesomeIcon icon={faComment}/> 6 comments</Button>
                    <Button variant={"outline-link"}><FontAwesomeIcon icon={faShare}/> Share</Button>
                </Card.Body>
                <Card.Body>
                    <div className="d-flex justify-content-left">
                        {/* <ProfileImageSmall imageUrl={`${serverUrl}images/users/${user.linear_id}/${user?.current_image[0]?.photo_orig_name}`}/> */}
                        <Form.Group>
                            <Form.Control type="text" placeholder="Write down a comment.."/>
                        </Form.Group>
                    </div>
                </Card.Body>
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
    image: PropTypes.string
}