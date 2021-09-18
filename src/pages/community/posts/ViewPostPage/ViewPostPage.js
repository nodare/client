import React, { useState, useEffect,useLayoutEffect } from 'react';
import { usePostData } from 'util/helpers/hooks/post.hooks'
import {  useParams, useHistory } from "react-router-dom";
import { ButtonGroup, Card, Tabs, Tab, Alert, Form, Row, Col, Spinner,ListGroup } from "react-bootstrap";
import * as ta from "timeago.js";
import CommentsComponent from 'components/common/comments/PostCommentItem'
import UpvoteButton from "components/shared/buttons/UpvoteButton";
import PostCommentItem from "components/common/comments/PostCommentItem";
import DeleteModal from "components/shared/modals/common/DeleteModal";
import EditorJs from 'react-editor-js'
import axios from 'axios'
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
// static post
import { accountId } from "static";
import toast from 'react-hot-toast'
import { UiContext } from 'pages'
import { Container, Header as He,Image,Button,Comment} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
function ViewPostPage(props) {
    const params = useParams()
    const history = useHistory()
    const ui = React.useContext(UiContext)
    const post = usePostData(params.post_id)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isCommentsLoading, setIsCommentsLoading] = useState(false)
    const [deletePostModal, showDeletePostModal] = useState(false)
    useLayoutEffect(()=>{
        loadData()
    },[])
    const [editorContent, setEditorContent] = useState(null)
    const [editor, setEditor] = useState(null)
    const [isReadOnly,setIsReadOnly] = useState(true)
    const [owner, setOwner] = useState(true)
    const [postFormValues, setPostFormValues] = useState({
        title: "",
        community_id: "",
        category_id: ""
    })

    const [userCommunities, setUserCommunities] = useState([])
    const [userCategories, setUserCategories] = useState([])
    useEffect(()=>{
        props.getCommunityCategories(params.community_id)
        console.log(params)
    }, [params.community_id])
    const onClickDeletePost = () => {
        showDeletePostModal(true)
    }

    const deletePost = () => {
        props.removePost(post.response.linear_id)
        props.removeContentsByPost(post.response.linear_id)
        props.removePostComments(post.response.linear_id)
        history.replace(`/square/${post.response.community_id}`)
        window.alert("Post Deleted")
    }

    const loadComments = async () => {
        await setIsCommentsLoading(true)
        await props.getPostComments(params.post_id)
        await setIsCommentsLoading(false)
    }
    const loadData = async () => {
        await props.getCommunityData(params.community_id)
        .then(() => {
            props.getPostData(params.post_id)
            .then(()=>{
                props.getPostContents(params.post_id)
                .then(()=>{
                    setEditorContent(props.contents)
                })
                props.verifyPostUpvote(params.post_id, accountId)
                .then((res)=>{
                    if(res.payload){
                        setIsUpvoted(true)
                    }
                })
            })
        })
        loadComments()
    }
    const upvotePost = () => {
        //setIsUpvoted(prevState => prevState = !prevState)
        props.togglePostUpvote(params.post_id, accountId).then((res)=>{
            console.log(props.postUpvotedBoolean)
        })

    }
    const handleEditorSave = async () => {
        setIsLoading(true)
        const savedData = await editor.save()
        setTimeout(() => {
            setEditorContent(savedData.blocks)
            setIsLoading(false)
            console.log(savedData)
        }, 500);
    }
    const editorMode = async () =>{
        setEditorContent(post.response.contents)
        setPostFormValues({
            title:post.response.title,
            community_id:post.response.community_id,
            category_id:post.response.category_id
        })
        console.log(postFormValues)
        setIsReadOnly(false)
    }

    const saveEditedPost = () => {
        if(postFormValues.title === "") return toast.error("Please include a title in your post. ")
        if(postFormValues.community === "") return toast.error("Please select which community to post. ")
        if(postFormValues.category_id === "") return toast.error("There's no category. Please select a category. ")
        if(editorContent.length === 0) return toast.error("Editor is empty. Please write something. ")

        let data = postFormValues
        data.user_id = ui?.currentUser?.linear_id
        console.log(editorContent)
        props.updatePost(params.post_id,data)
        .then(()=>{
            props.removeContentsByPost(params.post_id)
            .then(()=>{
                props.addNewPostContents( params.post_id, editorContent)
                .then(res=>{
                    toast.success("Post successfully edited!")
                    setIsReadOnly(true)
                    history.replace(`/square/${data.community_id}/post/${params.post_id}`)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(() => {
        setIsLoading(false)
        
        return()=>{
            props.clearPost()
            props.clearContents()
            props.clearComments()
        }

    }, [isLoading])
    const editorTools = {
        header: Header,
        paragraph: Paragraph,
        list: List,
        quote: Quote,
        table: Table,
        image: {
            class: ImageTool,
            config: {
                uploader:{
                    uploadByFile(file){
                        let formData = new FormData();
                        formData.append("image",file);
                        return axios.post("/files",formData,{
                            headers: {"content-type":"multipart/form-data"}
                        })
                        .then((res) =>{
                            console.log(res);
                            return new Promise((resolve) => {
                                resolve({ success: 1, file: { url: res.data.url } });
                              });
                        })
                    },
                    uploadByUrl(url) {
                        return new Promise((resolve) => {
                            resolve({ success: 1, file: { url: url } });
                          });
                    }
                }
            }
        }
    }
    console.log(post.response)
    return (
        <>
            <ListGroup>
                        <ListGroup.Item className="d-block justify-content-between" onClick={()=>history.replace(`/square/${post.response?.community_id}/`)}>
                            <strong>#All</strong>
                        </ListGroup.Item>
                {
                    props.categories.length > 0?
                        props.categories.map((category, i)=>{
                            return(
                                <ListGroup.Item className="d-block justify-content-between" onClick={()=>history.replace(`/square/${post.response?.community_id}/cat/${category.linear_id}`)} key={i}>
                                    <strong>#{category.name}</strong>
                                </ListGroup.Item>
                            )
                        })
                    :""
                }
            </ListGroup>
            <Container text>
                        <Card>
                            <Card.Body>

                                {/* main post */}
                                {isReadOnly?
                                <>
                                    <He as='h1'>{post.response?.title}</He>
                                    <div><Image src='https://placekitten.com/100/100' avatar/><span>{post.response?.user.username} / {ta.format(new Date(post.response?.created_at))}</span></div>
                                </>
                                :
                                <>
                                <Row>
                        <Col xs={12}  xl={3}>
                            <Form.Group>    
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title here" value={postFormValues.title} onChange={e=>setPostFormValues({...postFormValues, title: e.target.value})}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" custom value={postFormValues.category_id} onChange={e=>setPostFormValues({...postFormValues, category_id: e.target.value})}>
                                    {
                                        props.categories.map((category)=>{
                                            return(
                                                <option key={category.id} value={category.linear_id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                                </>
                                }
                                {post.response?
                                <>
                                    <EditorJs data={{blocks:post.response?.contents}} holder="editorBox" tools={editorTools} instanceRef={instance => setEditor(instance)} onChange={()=> handleEditorSave()} readOnly={isReadOnly}>
                                    <div id="editorBox"></div>
                                    </EditorJs>
                                </>
                                :
                                <div>Empty</div>
                                }
                                {/* end of main post */}

                                {/* post buttons */}
                                    <Button
                                    color={isUpvoted?'red':'green'}
                                    icon='heart'
                                    onClick={() => upvotePost()}
                                    label={{ basic: true, color: isUpvoted?'red':'green', pointing: 'left', content: post.response?.upvotes.length }}
                                    />
                                    <Button
                                    basic
                                    color='blue'
                                    icon='share'
                                    label={{
                                        as: 'a',
                                        basic: true,
                                        color: 'blue',
                                        pointing: 'left',
                                        content: '2,048',
                                    }}
                                    />
                                <ButtonGroup className="py-3">
                                    <Button size="sm" color={isReadOnly?"standard":"green"} onClick={isReadOnly?()=>editorMode():() =>saveEditedPost()}>{isReadOnly?"Edit":"Save"}</Button>
                                    <Button size="sm" variant="danger" onClick={()=>onClickDeletePost()}>Delete</Button>
                                    <Button size="sm" variant="danger">Report</Button>
                                </ButtonGroup>

                                <h4>Discussion ({props.comments.length})</h4>

                                {/* user comments */}
                                {isCommentsLoading ?"Loading..":(
                                    <Card.Footer>
                                            <CommentsComponent comments={props.comments} postLinearId={params.post_id} userId={ui?.currentUser?.linear_id}></CommentsComponent>
                                        
                                    </Card.Footer>
                                )
                            }

                            </Card.Body>
                        </Card>
                
            </Container>
            <DeleteModal
                isShow={deletePostModal}
                toggleTrigger={showDeletePostModal}
                header={"Confirm Delete"}
                text={"Are you sure you want to remove this post?"}
                deleteButtonText={"Remove post"}
                handleDeleteButton={() => deletePost()}
            ></DeleteModal>

        </>
    )
}

export { ViewPostPage }
