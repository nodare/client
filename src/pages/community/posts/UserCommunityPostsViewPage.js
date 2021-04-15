import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table, Image } from "react-bootstrap";
import * as ta from "timeago.js";

import { fetchPostData, fetchPostContents, fetchCommentsByPost, addCommentbyPostId, deleteComment } from "./../../../services/community.service";
import { getUserDetails } from "./../../../services/user.service";

// static post
import { accountId } from "./../../../static";

import UpvoteButton from "./../../../components/shared/buttons/UpvoteButton";


function UserCommunityPostsViewPage() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [isCommentsLoading, setIsCommentsLoading] = useState(true)
    
    const [owner, setOwner] = useState(true)
    // static data for now
    const [post, setPost] = useState([])
    const [postContents, setPostContents] = useState([])
    const [postComments, setPostComments] = useState([])
    
    const [showCommentsBox, setShowCommentsBox] = useState(true)
    const [commentInput, setCommentInput] = useState('')

    const onClickShowCommentsButton = () => {
        setShowCommentsBox(true)
    }

    const loadComments = () => {
        fetchCommentsByPost(params.post_id)
        .then(resComments=>{
            let commentsTemp = resComments
            commentsTemp.map((comment,i)=>{
                getUserDetails(comment.user_id)
                    .then(resUserDetails => {
                        comment.userDetails = resUserDetails
                    })
                    .catch(err=>{console.log(err)})
            })
            setPostComments(commentsTemp)
        })
        setTimeout(() => {
            setIsCommentsLoading(false)
        }, 1000);
    }

    const onClickSendComment = () => {
        // add a ccomment to send a comment to the api
        if(commentInput === ""){
            window.alert("Write something in the comment box.")
        }else{
            let data = {
                user_id: accountId,
                content: commentInput
            }
            
            addCommentbyPostId(post.linear_id, data)
            .then(res=>{
                setCommentInput('')
                window.alert("Comment added!")
                setIsCommentsLoading(true)
                loadComments()
            })
            .catch(err=>{
                window.alert("Unable to add a comment to this post. Please try again")
            })
            
        }
    }

    const onClickDeleteComment = commentLinearId => {
        deleteComment(commentLinearId)
        .then(res=>{
            window.alert("Comment deleted")
            setIsCommentsLoading(true)
            loadComments()
        })
    }

    useEffect(() => {
        fetchPostData(params.post_id)
        .then(resPost=>{
            setPost(resPost)
            fetchPostContents(resPost.linear_id)
            .then(resContent=>{
                setPostContents(resContent)
            })
        })
        setIsLoading(false)
        
        return()=>{
            setPost([])
            setPostContents([])
        }

    }, [])

    useEffect(() => {
        loadComments()
        
    }, [isLoading])
    
    return (
        <>
            <Container>
                
                <Tabs defaultActiveKey="post">
                    <Tab eventKey="post" title="post">
                        
                        <Card>
                            <Card.Body>

                                {/* main post */}
                                <>
                                    <span>Posted by: Lex</span><br/>
                                    <span>{ta.format(new Date(post.created_at))}</span>
                                    
                                    {postContents.map((content, i)=>{
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
                                                            break;
                                                        case 3:
                                                            return(
                                                                <h3 key={i}>{content.text}</h3>
                                                            )
                                                            break;
                                                        case 4:
                                                            return(
                                                                <h4 key={i}>{content.text}</h4>
                                                            )
                                                            break;
                                                        case 5:
                                                            return(
                                                                <h5 key={i}>{content.text}</h5>
                                                            )
                                                            break;
                                                        case 6:
                                                            return(
                                                                <h6 key={i}>{content.text}</h6>
                                                            )
                                                            break;
                                                    }
                                                    break;
                                                case "paragraph":
                                                    return(
                                                        <p key={i}>{content.text}</p>
                                                    )
                                                    break;
                                                case "link":
                                                    return(
                                                        <Link to={content.link}>Link</Link>
                                                    )
                                                    break;
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
                                                    break;
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
                                {/* end of main post */}

                                {/* post buttons */}
                                <ButtonGroup className="py-3">
                                    <UpvoteButton/>
                                    <Button size="sm" variant="primary" onClick={() => onClickShowCommentsButton(true)}>Comment</Button>
                                    <Button size="sm" variant="primary">Share</Button>
                                    <Button size="sm" variant="danger">Delete</Button>
                                    <Button size="sm" variant="danger">Report</Button>
                                </ButtonGroup>

                                <h4>Discussion (13)</h4>
                                <Form.Group className="d-flex justify-content-left">
                                    <textarea className="form-control" placeholder="Write a comment here" value={commentInput} onChange={e=>setCommentInput(e.target.value)}></textarea>
                                    <Button variant="primary" onClick={()=>onClickSendComment()}>Send</Button>
                                </Form.Group>

                                {/* user comments */}
                                {showCommentsBox === false?
                                    (
                                        <div className="commentsSectionBox">
                                            <div className="d-flex justify-content-center py-3">
                                                <span onClick={()=>onClickShowCommentsButton()} style={{cursor: "pointer"}}>Click to show comments</span>
                                            </div>
                                        </div>
                                    )
                                :
                                isCommentsLoading ?"Loading..":(
                                    postComments.length == 0 ?
                                        (
                                            <div className="text-center">
                                                <p>There are no comments to show as of now. </p>
                                            </div>
                                        )
                                    :
                                    postComments.map((comment, i)=>{
                                                return(
                                                    <div key={i} className="commentsSectionBox">
                                                        <div className="d-flex justify-content-left py-3">
                                                            <Image 
                                                                src={"https://placekitten.com/100/100"}
                                                                style={{height:'50px'}}
                                                                className="my-1 px-2"
                                                                roundedCircle
                                                            ></Image>
                                                            <div id="commentsSectionBox">
                                                                <strong>{comment.userDetails?.nickname}</strong> <small>{ta.format(comment.created_at)}</small>
                                                                <p>{comment.content}</p>
                                                                <div>
                                                                    <ButtonGroup className="justify-content-right">
                                                                        <UpvoteButton/>
                                                                        <Button size="sm" variant="primary">Comment</Button>
                                                                        <Button size="sm" variant="danger" onClick={() => onClickDeleteComment(comment.linear_id)}>Delete</Button>
                                                                        <Button size="sm" variant="danger">Repsort</Button>
                                                                    </ButtonGroup>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                }

                            </Card.Body>
                        </Card>

                    </Tab>


                    <Tab eventKey="settings" title="settings">
                        Settings page
                        
                        <Table
                            size={'sm'}
                            borderless
                            responsive
                        >
                            <tbody>
                                <tr>
                                    <td><strong>Communities</strong></td>
                                    <td>123</td>
                                </tr>
                                <tr>
                                    <td><strong>Registered</strong></td>
                                    <td>02/23/2020</td>
                                </tr>
                                <tr>
                                    <td><strong>Last logged in:</strong></td>
                                    <td>14 minutes ago</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
                
            </Container>
        </>
    )
}

export default UserCommunityPostsViewPage
