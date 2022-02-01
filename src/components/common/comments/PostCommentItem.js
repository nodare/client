import React, { useEffect,useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileComponent from "../users/ProfileItem"
import ReplyComponent from './CommentReplyItem';
import { useUserDetails } from "util/helpers/hooks/user.hooks";
import { UiContext } from 'pages'
import { Button, Comment, Form, Header,Divider,Icon,Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
function CommentsComponent({communityAddr,postLinearId,userId}){
  const ui = React.useContext(UiContext)
  const [postComments, setPostComments] = useState(null)
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [replyInput,setReplyInput] = useState({type:'',content:'',parent_comment_id:'',post_id:'',user_id:userId})
  const [commentInput,setCommentInput] = useState({type:'',content:'',post_id:'',user_id:userId})
  const [isReplyLoading,setIsReplyLoading] = useState(false)
  const [isPrivileged,setIsPrivileged] = useState(false)
  const [selectedComment,setSelectedComment] = useState(0)
  const [commentCount,setCommentCount] = useState(0)
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
const privilegeCheck = communityAddr =>{
  let data ={
    addr:communityAddr,
    user_id:ui.currentUser.linear_id
  }
  axios.post(`community/follow/status`,data).then((res)=>{
    if(res.data.status>=3){
      setIsPrivileged(true)
    }else{
      setIsPrivileged(false)
    }
  })
}
const deleteComment = commentLinearId => {
  const data={
    status:0,
    content:""
  }
  axios.put(`comments/${commentLinearId}/post`,data)
  .then((res)=>{
      loadComments(postLinearId)
  })
}
const loadComments = postLinearId =>{
  axios.get(`comments/post/source/${postLinearId}`)
  .then((res)=>{
    setIsReplyLoading(true)
    setPostComments(res.data)
    axios.get(`comments/post/count/${postLinearId}`)
    .then((res)=>{
      setCommentCount(res.data[0].count)
    })
    setIsReplyLoading(false)
  })
}
  useEffect(()=>{
    loadComments(postLinearId)
  },[postLinearId])
  useEffect(()=>{
    if(ui?.currentUser?.linear_id&&communityAddr) privilegeCheck(communityAddr)
  },[ui])
  return(
    postComments?.length>0?
    <>
    <Comment.Group threaded>
    <Label color='blue' ribbon>
      Discussion ({commentCount})
    </Label>
    {postComments.map((comment,i)=>{
      return(
      <Comment>
        <Comment.Avatar src='https://placekitten.com/50/50'/>
        <Comment.Content>
          <Comment.Author as='a'>
          <ProfileComponent userLinearId={comment.user_id}/>
          </Comment.Author>
          <Comment.Metadata>
            <span>{comment.created_at}</span>
          </Comment.Metadata>
          <Comment.Text>{comment.status?comment.content:"Deleted Comment"}</Comment.Text>
          <Comment.Actions>
          <Comment.Action style={{"color":"black","display":comment.status?"inline-block":"none"}} onClick={()=>handleReplyButton(i)}>Reply</Comment.Action>
          {
            (ui?.currentUser?.linear_id==comment.user_id)||isPrivileged?
            <Comment.Action style={{"display":comment.status?"inline-block":"none"}} onClick={()=>deleteComment(comment.linear_id)}>Delete</Comment.Action>
            :
            ""
          }
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
          {isReplyLoading?
          <ReplyComponent communityAddr={communityAddr} commentLinearId={comment.linear_id} isReplyLoading={isReplyLoading}/>
          :
          <ReplyComponent communityAddr={communityAddr} commentLinearId={comment.linear_id} isReplyLoading={isReplyLoading}/>
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
    <Label color='blue' ribbon>
      Discussion ({commentCount})
    </Label>
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
  communityAddr: PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired
}