/* 
    This is a part of the UserCommunityViewPage component,
    where used inside a mapped function of getting posts. 
*/

import React, { useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import * as ta from "timeago.js";
import {  useParams, useHistory } from "react-router-dom";
import { usePostData } from "util/helpers/hooks/post.hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
function PostCardItem({post}) {
    const postData = usePostData(post.linear_id).response
    const params = useParams()
    console.log(postData?.commentcount)
    return (
        <LinkContainer key={post.id} to={`/square/${params.addr}/post/${post.linear_id}`}>
            <Card className="p-3 mb-2 mx-1">
                <div className="py-2">
                    <span><strong>{postData?.user.name || "Nodaq User"}</strong></span>
                    <div><small><em>{ta.format(postData?.created_at)}</em></small></div>
                    <div className="text-secondary">#{postData?.category?.name || "Uncategorized"}</div>
                    <div>{post.title}</div>
                    <FontAwesomeIcon icon={faThumbsUp} fixedWidth className="text-secondary"></FontAwesomeIcon><span>{postData?.upvotecount}</span>
                    <FontAwesomeIcon icon={faComment} fixedWidth className="text-secondary"></FontAwesomeIcon><span>{postData?.commentcount}</span>
                </div>
            </Card>
        </LinkContainer>
    )
}

export default PostCardItem

PostCardItem.propTypes = {
    post: PropTypes.object.isRequired
}