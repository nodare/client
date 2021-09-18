/* 
    This is a part of the UserCommunityViewPage component,
    where used to display the post contents from a post.
*/

import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Card,Image,Carousel } from "react-bootstrap";
import PropTypes from 'prop-types'

function PostThumbnailComponent({contents}) {
    const [postContents, setPostContents] = useState([])
    useEffect(() => {
        setPostContents(()=>{
                return contents?.filter((content)=>{
                    return content?.type === "image"
                }).splice(0,7)
        })

    }, [contents])
    console.log(postContents)
    return (
        postContents?
            postContents?.map((content, i)=>{
                return(<Image className="d-block" src={content.data.file.url} style={{height:"100px",width:"100px",objectFit:"scale-down"}} key={i}/>)
                })
            :
            null
    )
}
export default PostThumbnailComponent

PostThumbnailComponent.propTypes={
    contents: PropTypes.object.isRequired
}