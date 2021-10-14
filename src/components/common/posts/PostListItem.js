/* 
    This is a part of the UserCommunityViewPage component,
    where used inside a mapped function of getting posts. 
*/

import React, { useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import * as ta from "timeago.js";

import { usePostData } from "util/helpers/hooks/post.hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

function PostListItem({post}) {
    const postData = usePostData(post.linear_id).response
    
    return (
        <LinkContainer key={post.id} to={`/square/${post.community_id}/post/${post.linear_id}`}>
            <ListGroup.Item as="li" style={{cursor: "pointer"}}>
                <div className="d-flex justify-content-between">
                    <div className="d-block">
                        <span><strong>{postData?.user.username || "Nodaq User"}</strong> - <small><em>{ta.format(postData?.created_at)}</em></small></span>
                        <div className="text-secondary">#{postData?.category?.name || "Uncategorized"}</div>
                        <div>{post.title}</div>
                        <FontAwesomeIcon icon={faThumbsUp} fixedWidth className="text-secondary"></FontAwesomeIcon><span>{postData?.upvotecount.count}</span>
                        <FontAwesomeIcon icon={faComment} fixedWidth className="text-secondary"></FontAwesomeIcon><span>{postData?.commentcount.count}</span>
                    </div>
                </div>
            </ListGroup.Item>
        </LinkContainer>
    )
}

export default PostListItem


PostListItem.propTypes = {
    post: PropTypes.object.isRequired
}