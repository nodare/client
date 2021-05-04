import React, {useState} from 'react'
import UpvoteButton from "components/shared/buttons/UpvoteButton";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table, Image } from "react-bootstrap";
import * as ta from "timeago.js";


import { accountId } from "static";

/* 
    props:
        key: number
        image: string,
        comment: Object,
        handleUpvoteButton: function
        handleCommentReply: function
        handleDeleteComment: function
        handleReportButton: function
*/
function PostCommentItem(props) {
    const [commentInput, setCommentInput] = useState("")
    const [commentInputBox, toggleCommentInputBox] = useState(false)
    const [toastContainer, setToastContainer] = useState("")

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
                        <strong>{props.comment.userDetails?.nickname}</strong> <small>{ta.format(props.comment.created_at)}</small>
                        <p>{props.comment.content}</p>
                        <ButtonGroup className="justify-content-right">
                            <UpvoteButton/>
                            <Button size="sm" variant="primary" onClick={()=>toggleCommentInputBox(!commentInput)}>Comment</Button>
                            <Button size="sm" variant="danger" onClick={() => props.handleDeleteComment(props.comment.linear_id)}>Delete</Button>
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
        </>
    )
}

export default PostCommentItem
