/* 
    This is a part of the UserCommunityViewPage component,
    where used to display the post contents from a post.
*/

import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Card,Image } from "react-bootstrap";
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
                    const data = content.data
                    switch(content.type){
                        case "header":
                            return "<h"+data.level+"key="+i+">"+data.text+"</h"+data.level+">"
                        case "paragraph":
                            return(
                                <p className="mb-0" key={i}>{data.text}</p>
                            )
                        case "link":
                            return(
                                <Link to={data.link}>Link</Link>
                            )
                        case "quote":
                            return(
                                <Card key={i}>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                            <p>{' '}{data.text}{' '}</p>
                                        </blockquote>
                                        <footer className="blockquote-footer">{data.caption}</footer>
                                    </Card.Body>
                                </Card>
                            )
                        case "code":
                            return(
                            <pre><code>{data.code}</code></pre>
                            )
                        case "list":
                            switch(data.style){
                                case "ordered":
                               return(
                                    <ol>
                                        {
                                            data.items?.map((item,i)=>{
                                                <li key={i}>{item}</li>
                                            })
                                        }
                                    </ol>)
                                case "unordered":
                                    return(<ul>
                                        {
                                            data.items?.map((item,i)=>{
                                                <li key={i}>{item}</li>
                                            })
                                        }
                                    </ul>)
                                default: 
                                    break;
                            }
                        //    break;
                        // case "table":
                        //     <Table>
                        //         {
                        //             data.content.map((row, i)=>{
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
                        if(data?.stretched){
                            data.stretched="image-tool--stretched "
                        }else{
                            data.stretched=""
                        }
                        if(data?.withBackground){
                             data.withBackground="image-tool--withBackground"
                        }else{
                            data.withBackground=""
                        }
                            return(
                                <Card key={i} className=
                                {data.stretched+data.withBackground}
                                >
                                    <Card.Img variant="top" src={data.file.url} alt={data.caption}/>
                                    <Card.Body>
                                    <Card.Text>{data.caption}</Card.Text>
                                    </Card.Body>
                                </Card>
                                )
                        case "embed":
                            switch (data.service) {
                              case "vimeo":
                                return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                              case "youtube":
                                return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                              default:
                                throw new Error(
                                  "Only Youtube and Vime Embeds are supported right now."
                                );
                            }
                        case "delimiter":
                            return(<br/>)
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
