import React, { useEffect,useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUserDetails } from "util/helpers/hooks/user.hooks";
import ProfileComponent from '../users/ProfileItem';
import { Button, Comment, Form, Header,Divider,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { UiContext } from 'pages'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
function ReplyComponent({communityAddr,commentLinearId,isReplyLoading}){
      const [commentReplies, setCommentReplies] = useState(null)
      const [isPrivileged,setIsPrivileged] = useState(false)
      const ui = React.useContext(UiContext)
      const loadReplies = commentLinearId => {
          axios.get(`comments/post/replies/${commentLinearId}`)
          .then((res)=>{
            setCommentReplies(res.data)
          })
        }
      const deleteReply = commentLinearId => {
          axios.delete(`comments/${commentLinearId}/post`)
          .then((res)=>{
              loadReplies(commentLinearId)
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
      useEffect(()=>{
        console.log("called reply component")
        loadReplies(commentLinearId)
      },[isReplyLoading])
      useEffect(()=>{
        if(ui?.currentUser?.linear_id&&communityAddr) privilegeCheck(communityAddr)
      },[ui])
    return(
            commentReplies ?
                commentReplies?.map((reply,i)=>{
                    return(
                    <Comment>
                        <Comment.Avatar src='https://placekitten.com/50/50' />
                        <Comment.Content>
                        <Comment.Author as='a'><ProfileComponent userLinearId={reply.user_id}/></Comment.Author>
                        <Comment.Metadata>
                            <div>{reply.created_at}</div>
                        </Comment.Metadata>
                        <Comment.Text>{reply.content}</Comment.Text>
                        <Comment.Actions>
                        {
                            (ui?.currentUser?.linear_id==reply.user_id)||isPrivileged?
                            <Comment.Action onClick={()=>deleteReply(reply.linear_id)}>Delete</Comment.Action>
                            :
                            ""
                        }
                        </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                )
                })
            :
            ""
              
    )
}
export default ReplyComponent