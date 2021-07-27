import React, { useState, useEffect } from 'react';
import {  useParams, useHistory } from "react-router-dom";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table } from "react-bootstrap";
import * as ta from "timeago.js";

import PostContentsComponent from 'components/common/posts/PostContents'
import UpvoteButton from "components/shared/buttons/UpvoteButton";
import PostCommentItem from "components/common/comments/PostCommentItem";
import DeleteModal from "components/shared/modals/common/DeleteModal";
import EditorJs from 'react-editor-js'
// static post
import { accountId } from "static";



function ViewPostPage(props) {
    const params = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [isCommentsLoading, setIsCommentsLoading] = useState(false)
    const [showCommentsBox, setShowCommentsBox] = useState(true)
    const [deleteCommunityModal, showDeleteCommunityModal] = useState(false)

    const [owner, setOwner] = useState(true)
    
    const [commentInput, setCommentInput] = useState('')

    const onClickUpvoteButton = () => {
        let data = {
            status: !props.postUpvoteData.status
        }
        props.togglePostUpvote( props.postUpvoteData.linear_id, data)
        props.verifyPostUpvote(params.post_id, accountId)
    }
    
    const onClickDeleteCommunity = () => {
        showDeleteCommunityModal(true)
    }

    const deleteCommunity = () => {
        props.removePost(props.postData.linear_id)
        props.removeContentsByPost(props.postData.linear_id)
        history.replace(`/square/${props.postData.community_id}`)
        window.alert("Post Deleted")
    }

    const onClickShowCommentsButton = () => {
        setShowCommentsBox(true)
    }

    const loadComments = async () => {
        await setIsCommentsLoading(true)
        await props.getPostComments(params.post_id)
        await setIsCommentsLoading(false)
    }

    const onClickSendComment = () => {
        // add a comment to send a comment to the api
        if(commentInput === ""){
            window.alert("Write something in the comment box.")
        }else{
            
            let data = {
                user_id: accountId, 
                post_id: params.post_id,
                content: commentInput,
                parent_comment_id: null
            }

            const addComment = async (data) => {
                await props.addPostComment(data)
            }

            addComment(data).then(()=>{
                setCommentInput('')
                loadComments()
            })
            
        }
    }

    const sendCommentReply = ( data, commentLinearId=null ) => {
        props.addPostComment(data)
        .then(()=>{
            console.log("tests")
            loadComments()
        })
    }

    const deleteComment = commentLinearId => {
        props.removePostComment(commentLinearId)
        .then(res=>{
            // window.alert("Comment deleted")
            loadComments()
        })
    }

    const loadData = async () => {
        await props.getCommunityData(params.community_id)
        .then(async () => {
            await props.getPostData(params.post_id)
            .then(()=>{
                props.getPostContents(params.post_id)
                props.verifyPostUpvote(params.post_id, accountId)
            })
        })
        loadComments()
    }
    
    useEffect(() => {
        
        loadData()
        setIsLoading(false)
        if(props.postData === null || props.postData === ""){
            history.replace('/page-not-found')
        }
        
        return()=>{
            props.clearPost()
            props.clearContents()
            props.clearComments()
        }

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
                                    <h2>{props.postData.title}</h2>
                                    <span>Posted by: Lex</span><br/>
                                    <span>{ta.format(new Date(props.postData.created_at))}</span>

                                    <PostContentsComponent contents={props.contents}/>
                                    
                                </>
                                {/* end of main post */}

                                {/* post buttons */}
                                <ButtonGroup className="py-3">
                                    <UpvoteButton 
                                        upvoteName={props.communityData.upvote_name}
                                        upvotedName={props.communityData.upvoted_name}
                                        isUpvoted={props.postUpvoteData.status}
                                        handleUpvote={onClickUpvoteButton}
                                    />
                                    <Button size="sm" variant="primary" onClick={() => onClickShowCommentsButton(true)}>Comment</Button>
                                    <Button size="sm" variant="primary">Share</Button>
                                    <Button size="sm" variant="danger" onClick={()=>onClickDeleteCommunity()}>Delete</Button>
                                    <Button size="sm" variant="danger">Report</Button>
                                </ButtonGroup>

                                <h4>Discussion ({props.comments.length})</h4>
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
                                    props.comments.length == 0 ?
                                        (
                                            <div className="text-center">
                                                <p>There are no comments to show as of now. </p>
                                            </div>
                                        )
                                    :
                                    props.comments.map((comment, i)=>{
                                        if(comment.parent_comment_id === null){
                                            return(
                                                <div key={i}>
                                                    <PostCommentItem
                                                        image={"https://placekitten.com/100/100"}
                                                        comment={comment}
                                                        handleAddCommentReply={sendCommentReply}
                                                        handleDeleteComment={deleteComment}
                                                    />
                                                </div>
                                            )
                                        }
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
            <DeleteModal
                isShow={deleteCommunityModal}
                toggleTrigger={showDeleteCommunityModal}
                header={"Confirm Delete"}
                text={"Are you sure you want to remove this community?"}
                deleteButtonText={"Remove Community"}
                handleDeleteButton={() => deleteCommunity()}
            ></DeleteModal>

        </>
    )
}

export { ViewPostPage }
