/* 
    This is a part of the UserCommunityViewPage component,
    where used to display the post contents from a post.
*/

import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PropTypes from 'prop-types'

function PostContentsComponent({contents, isPreview}) {
    const [postContents, setPostContents] = useState(null)
    
    useEffect(() => {
        setPostContents((prevState)=>{
            if(isPreview === true){
                return contents?.filter((content)=>{
                    return content?.type === "paragraph"
                }).splice(0,3)
            }else{
                return contents
            }
        })
    }, [contents])

    
    return (
        <>
            {postContents?.map((content, i)=>{
                {
                    
                    switch(content.type){
                        case "header":
                            switch(content.level){
                                case 1:
                                    return(
                                        <h1 key={i}>{content.text}</h1>
                                    )
                                case 2:
                                    return(
                                        <h2 key={i}>{content.text}</h2>
                                    )
                                case 3:
                                    return(
                                        <h3 key={i}>{content.text}</h3>
                                    )
                                case 4:
                                    return(
                                        <h4 key={i}>{content.text}</h4>
                                    )
                                case 5:
                                    return(
                                        <h5 key={i}>{content.text}</h5>
                                    )
                                case 6:
                                    return(
                                        <h6 key={i}>{content.text}</h6>
                                    )
                            }
                            break;
                        case "paragraph":
                            return(
                                <p className="mb-0" key={i}>{content.text}</p>
                            )
                        case "link":
                            return(
                                <Link to={content.link}>Link</Link>
                            )
                        case "quote":
                            return(
                                // to be revised
                                <Card key={i}>
                                    <Card.Body>
                                        <div className="d-block">
                                            <p>{content.text}</p>
                                        </div>
                                        <small>{content.caption}</small>
                                    </Card.Body>
                                </Card>
                            )
                        case "list":
                            switch(content.style){
                                case "ordered":
                                    <ol>
                                        {
                                            content.items.map((item,i)=>{
                                                <li key={i}>{item}</li>
                                            })
                                        }
                                    </ol>
                                    break;
                                case "unordered":
                                    <ul>
                                        {
                                            content.items.map((item,i)=>{
                                                <li key={i}>{item}</li>
                                            })
                                        }
                                    </ul>
                                    break;
                                default: 
                                    break;
                            }
                            break;
                        // case "table":
                        //     <Table>
                        //         {
                        //             content.data.content.map((row, i)=>{
                        //                 (
                        //                     <tr key={i}>
                        //                         {
                        //                             row.map((cell, j)=>{
                        //                                 <td key={j}>
                        //                                     {cell}
                        //                                 </td>
                        //                             })
                        //                         }
                        //                     </tr>
                        //                 )
                        //             })
                        //         }
                        //     </Table>
                        //     break;
                        case "image":
                            // code placed sood
                            break;
                        default:
                            break;
                    }
                }
            })}
        </>
    )
}

export default PostContentsComponent

PostContentsComponent.propTypes={
    contents: PropTypes.array.isRequired,
    isPreview: PropTypes.bool
}
