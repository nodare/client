import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import * as ta from "timeago.js";

import UpvoteButton from "components/shared/buttons/UpvoteButton";
import PostCommentItem from "components/common/comments/PostCommentItem";
import DeleteModal from "components/shared/modals/common/DeleteModal";


import { getCommunityData, clearCommunityData} from "util/redux/actions/community.actions";
import { getPostData, getPostContents, removeContentsByPost, removePost, clearPost, clearContents } from "util/redux/actions/posts.actions";
import { getPostComments, addPostComment, removePostComment, addCommentReply, clearComments } from "util/redux/actions/comments.actions";
import { verifyPostUpvote, togglePostUpvote } from "util/redux/actions/upvotes.actions";

// static post
import { accountId } from "./../../../static";



function UserCommunityPostsViewPage(props) {
    const params = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [isCommentsLoading, setIsCommentsLoading] = useState(false)
    const [showCommentsBox, setShowCommentsBox] = useState(true)
    const [deleteCommunityModal, showDeleteCommunityModal] = useState(false)
    
    const postComments = props.comments

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

    useEffect(() => {
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
        loadData()
        setIsLoading(false)
        if(props.postData === null || props.postData === ""){
            history.replace('/page-not-found')
        }
        
        // fetchPostData(params.post_id)
        // .then(resPost=>{
        //     setPost(resPost)
        //     fetchPostContents(resPost.linear_id)
        //     .then(resContent=>{
        // })
        //         setPostContents(resContent)
        //     })
        
        return()=>{
            props.clearPost()
            props.clearContents()
            props.clearComments()
        }

    }, [])

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
                                    
                                    {props.contents.map((content, i)=>{
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
                                                        <p key={i}>{content.text}</p>
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
                                    postComments.map((comment, i)=>{
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

const mapStateToProps = state => ({
    communityData: state.community.item,
    postData: state.posts.item,
    contents: state.posts.contents,
    comments: state.comments.items,
    postUpvoteData: state.upvotes.postUpvoteItem
})

const mapDispatchToProps = {
    verifyPostUpvote,
    togglePostUpvote,
    getCommunityData,
    getPostData,
    removePost,
    getPostContents,
    getPostComments,
    addPostComment,
    removePostComment,
    removeContentsByPost,
    clearCommunityData,
    clearPost,
    clearContents,
    clearComments
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCommunityPostsViewPage)
