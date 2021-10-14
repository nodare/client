import React, { useEffect,useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUserDetails } from "util/helpers/hooks/user.hooks";
import { Button, Comment, Form, Header,Divider,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
function ReplyComponent({commentLinearId,isReplyLoading}){
    const [commentReplies, setCommentReplies] = useState(null)
    const loadReplies = commentLinearId => {
        axios.get(`comments/post/replies/${commentLinearId}`)
        .then((res)=>{
          setCommentReplies(res.data)
        })
      }
    const deleteReply = commentLinearId => {
        axios.delete(`comments/${commentLinearId}/post`)
        .then((res)=>{
            // window.alert("Comment deleted")
        })
      }
      useEffect(()=>{
        console.log("called reply component")
        loadReplies(commentLinearId)
      },[isReplyLoading])
    return(
            commentReplies ?
                commentReplies?.map((reply,i)=>{
                    return(
                    <Comment>
                        <Comment.Avatar src='https://placekitten.com/50/50' />
                        <Comment.Content>
                        <Comment.Author as='a'>{reply.user_id}</Comment.Author>
                        <Comment.Metadata>
                            <div>{reply.created_at}</div>
                        </Comment.Metadata>
                        <Comment.Text>{reply.content}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action onClick={()=>deleteReply(reply.linear_id)}>Reply</Comment.Action>
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