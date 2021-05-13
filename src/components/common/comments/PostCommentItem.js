import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table, Image } from "react-bootstrap";
import * as ta from "timeago.js";

import { getUserDetails, clearUserDetails } from "util/redux/actions/auth.actions";

import UpvoteButton from "components/shared/buttons/UpvoteButton";
import DeleteModal from "components/shared/modals/common/DeleteModal";

import { accountId } from "static";

function PostCommentItem(props) {
    const [userDetails, setUserDetails] = useState({})
    const [commentInput, setCommentInput] = useState("")
    const [commentInputBox, toggleCommentInputBox] = useState(false)
    const [deleteCommentModal, showDeleteCommentModal] = useState(false)

    
    const getUserDetails = async () => {
        await props.getUserDetails(props.comment.user_id)
        await setUserDetails(props.user)
        // await props.clearUserDetails()
        await console.log(userDetails)
    }

    const handleCommentReplyButton = (commentLinearId) => {
        if(commentInput === ""){
            window.alert("Field is empty");
            return
        }
        let data = {
            user_id: accountId,
            post_id: props.comment.post_id,
            content: commentInput,
            parent_comment_id: commentLinearId
        }
        props.handleAddCommentReply(data)
        setCommentInput("")
    }

    const onClickDeleteButton = () => {
        showDeleteCommentModal(true)
    }

    const handleDeleteCommentButton = () => {
        props.handleDeleteComment(props.comment.linear_id)
        showDeleteCommentModal(false)
    }
    

    useEffect(() => {
        getUserDetails()
        return() => {
            props.clearUserDetails()
        }
    }, [])

    


    return (
        <>
            <div className="commentsSectionBox">
                <div className="d-flex justify-content-left py-3">
                    <Image 
                        src={props.image}
                        style={{height:'50px'}}
                        className="my-1 px-2"
                        roundedCircle
                    ></Image>
                    <div id="commentsSectionBox" className="w-100">
                        <strong>{userDetails.nickname}</strong> <small>{ta.format(props.comment.created_at)}</small>
                        <p>{props.comment.content}</p>
                        <ButtonGroup className="justify-content-right">
                            {/* <UpvoteButton/> */}
                            <Button size="sm" variant="primary" onClick={()=>toggleCommentInputBox(!commentInput)}>Comment</Button>
                            <Button size="sm" variant="danger" onClick={() => onClickDeleteButton(true)}>Delete</Button>
                            <Button size="sm" variant="danger">Report</Button>
                        </ButtonGroup>
                    </div>
                </div>
                    <div>
                        {
                            commentInputBox?
                                <>
                                    <Form.Group className="d-flex justify-content-left ml-5">
                                        <Image 
                                            src={props.image}
                                            style={{height:'50px'}}
                                            className="my-1 px-2"
                                            roundedCircle
                                        ></Image>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={commentInput} 
                                            placeholder={"Write a reply to this comment"}
                                            onChange={e=>setCommentInput(e.target.value)}
                                        />
                                        <Button onClick={()=>handleCommentReplyButton(props.comment.linear_id)}>Reply</Button>
                                    </Form.Group>
                                </>
                            :""
                        }
                    </div>
            </div>
            <DeleteModal
                isShow={deleteCommentModal}
                toggleTrigger={showDeleteCommentModal}
                header={"Confirm Comment Delete"}
                text={"Are you sure you want to delete this comment?"}
                handleDeleteButton={() => handleDeleteCommentButton()}
                deleteButtonText={"Delete Comment"}
            ></DeleteModal>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.userDetails
})

const mapDispatchToProps = {
    getUserDetails,
    clearUserDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCommentItem)

PostCommentItem.propTypes = {
    image: PropTypes.string,
    comment: PropTypes.object,
    user: PropTypes.object,
    handleUpvoteButton: PropTypes.func,
    handleCommentReply: PropTypes.func,
    handleDeleteComment: PropTypes.func,
    handleReportButton: PropTypes.func,
}
