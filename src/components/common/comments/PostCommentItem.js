import React, { useEffect,useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUserDetails } from "util/helpers/hooks/user.hooks";
import { Button, Comment, Form, Header,Divider,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
function CommentsComponent({comments,postLinearId,userId}){
  
  const [postComments, setPostComments] = useState(null)
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [replyInput,setReplyInput] = useState({type:'',content:'',parent_comment_id:'',post_id:'',user_id:userId})
  const [commentInput,setCommentInput] = useState({type:'',content:'',post_id:'',user_id:userId})
  const [selectedComment,setSelectedComment] = useState(0)
  const handleReplyButton =(key) =>{
    setSelectedComment(key)
    setShowReplyBox(true)
  }
  const sendReply = (data) => {
    const addReply = async (data) => {
      await axios.post(`comments/reply`,data)
  }
  addReply(data)
    .then(()=>{
      setReplyInput({type:'',content:'',parent_comment_id:'',post_id:'',user_id:userId})
      loadComments(postLinearId)
    })
}
const deleteReply = commentLinearId => {
  axios.delete(`comments/${commentLinearId}/post`)
  .then((res)=>{
      // window.alert("Comment deleted")
  })
}
const sendComment = (data) => {
  const addComment = async (data) => {
    let res = await axios.post(`comments/post`, data )
}
  addComment(data)
  .then(()=>{
      setCommentInput({type:'',content:'',post_id:''})
      loadComments(postLinearId)
  })
}
const deleteComment = commentLinearId => {
  axios.delete(`comments/${commentLinearId}/post`)
  .then((res)=>{
      // window.alert("Comment deleted")
  })
}
const loadComments = postLinearId =>{
  axios.get(`comments/post/source/${postLinearId}`)
  .then((res)=>{
    console.log(res)
    comments =res.data
  })
}
  useEffect(()=>{
    console.log(comments)
    if(comments?.length>0){
    setPostComments((prevState)=>{
        return comments?.filter((comment)=>{
          console.log(comment?.parent_comment_id === null?"TRUE":"FALSE")
          return comment?.parent_comment_id === null
        })
    })
    }
  },[comments])
  console.log(postComments)
  return(
    postComments?.length>0?
    <>
    <Comment.Group threaded>
    {postComments.map((comment,i)=>{
      return(
      <Comment>
        <Comment.Avatar src='https://placekitten.com/50/50'/>
        <Comment.Content>
          <Comment.Author as='a'>{comment.user_id}</Comment.Author>
          <Comment.Metadata>
            <span>{comment.created_at}</span>
          </Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
          <Comment.Action onClick={()=>handleReplyButton(i)}>Reply</Comment.Action>
          </Comment.Actions>
          <Form className={i===selectedComment&&showReplyBox?"d-block":"d-none"} reply>
                  <Form.TextArea value={replyInput.content} onChange={(e)=>setReplyInput({type:"text",content:e.target.value,parent_comment_id:comment.linear_id,post_id:postLinearId,user_id:userId})}/>
                  <Button
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                    onClick={()=>sendReply(replyInput)}
                    primary
                  />
          </Form>
        </Comment.Content>
        <Comment.Group>
      {comments.map((reply,j)=>{
        if(reply.parent_comment_id === comment.linear_id){
          return(
            <Comment>
              <Comment.Avatar src='https://placekitten.com/50/50' />
              <Comment.Content>
                <Comment.Author as='a'>{reply.user_id}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{reply.content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={()=>handleReplyButton()}>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          )
        }
      })
      }
        </Comment.Group>
      </Comment>
      )
    })
  }
    <Form reply>
      <Form.TextArea value={commentInput.content} onChange={(e)=>setCommentInput({type:"text",content:e.target.value,post_id:postLinearId,user_id:userId})}/>
      <Button content='Add Comment' labelPosition='left' icon='edit' onClick={()=>sendComment(commentInput)} primary />
    </Form>
    </Comment.Group>
    </>
    :
    <>
    <Comment.Group>
    <Form reply>
      <Form.TextArea value={commentInput.content} onChange={(e)=>setCommentInput({type:"text",content:e.target.value,post_id:postLinearId,user_id:userId})}/>
      <Button content='Add Comment' labelPosition='left' icon='edit' onClick={()=>sendComment(commentInput)} primary />
    </Form>
    </Comment.Group>
    </>
    )
}
export default CommentsComponent

CommentsComponent.propTypes={
  comments: PropTypes.array.isRequired,
  postLinearId: PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired
}