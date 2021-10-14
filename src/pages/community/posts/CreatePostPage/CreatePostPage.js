import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from 'static'

import { useHistory } from "react-router";
import { Alert, Container, Form, Row, Col, Card, Spinner, Breadcrumb } from "react-bootstrap";

import { HotToast } from 'components/common/toasts/toast'

import EditorJs from 'react-editor-js'
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import {  useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import {Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { UiContext } from 'pages'

function CreatePostPage(props) {
    const history = useHistory()
    const ui = React.useContext(UiContext)
    const params = useParams()
    const [postContents, setPostContents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [editor, setEditor] = useState(null)
    const [editorContent, setEditorContent] = useState(null)
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
    const [postFormValues, setPostFormValues] = useState({
        title: "",
        community_id: "",
        category_id: ""
    })

    const [userCommunities, setUserCommunities] = useState([])
    const [userCategories, setUserCategories] = useState([])
    
    const loadOptions = () => {
        props.getUsersCommunities(ui?.currentUser?.linear_id)
    }
    useEffect(()=>{
        setPostFormValues({
            ...postFormValues,
            community_id:params.community_id?params.community_id:"",
            category_id:params.category_id?params.category_id:"",
        })
        props.getCommunityCategories(params.community_id)
        .then(()=>{
            console.log(props.categories)
            setUserCategories(props.categories)
        })
    },[params])
    useEffect(()=>{
        // wat
        if(userCommunities.length > 0) setUserCommunities([])
        loadOptions()
    }, [ui])



    const handleEditorSave = async () => {
        setIsLoading(true)
        const savedData = await editor.save()
        setTimeout(() => {
            setEditorContent(savedData.blocks)
            setPostContents(savedData.blocks)
            setIsLoading(false)
            console.log(savedData)
        }, 500);
    }

    // may problem dito. late kinukuha length
    const handleChangeCommunity = communityLinearId => {
        setPostFormValues({...postFormValues, community_id: communityLinearId })
        props.getCommunityCategories(communityLinearId)
        .then(()=>{
            setUserCategories("")
        })
    }

    const addNewPost = () => {
        if(postFormValues.title === "") return toast.error("Please include a title in your post. ")
        if(postFormValues.community === "") return toast.error("Please select which community to post. ")
        if(postFormValues.category_id === "") return toast.error("There's no category. Please select a category. ")
        if(postContents.length === 0) return toast.error("Editor is empty. Please write something. ")

        let data = postFormValues
        data.user_id = ui?.currentUser?.linear_id

        props.addNewPost(data)
        .then(newPost=>{
            props.addNewPostContents( newPost.payload.linear_id, postContents)
            .then(res=>{
                toast.success("Post successfully created!")
                history.replace(`/square/${data.community_id}/cat/${data.category_id}`)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
        <>
            <HotToast/>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/square">Community</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Post</Breadcrumb.Item>
                </Breadcrumb>
                <Alert variant={"warning"}>
                    <b>NOTE:</b> For <b className="text-danger">Non-subscribed users</b>, please note that you are only allowed to create contents only up to <b className="text-danger">10 blocks.</b> You can create more blocks by subscribing <Link to="/store">here.</Link>
                </Alert>
                <div>
                    <Row>
                        <Col xs={12}  xl={3}>
                            <Form.Group>    
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title here" value={postFormValues.title} onChange={e=>setPostFormValues({...postFormValues, title: e.target.value})}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Form.Group>
                                <Form.Label>Community</Form.Label>
                                <Form.Control as="select" value={postFormValues.community_id} onChange={e=>handleChangeCommunity(e.target.value)}>
                                    <option disabled value="">--Select Community--</option>
                                    {
                                        props.communities.map((community)=>{
                                            return(
                                                <option key={community.id} value={community.linear_id}>{community.title}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" custom value={postFormValues.category_id} onChange={e=>setPostFormValues({...postFormValues, category_id: e.target.value})}>
                                    <option disabled value="">--Select Category--</option>
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
                </div>
                <Card className="p-3 my-3">
                    {/* <div id="editorBox"/> */}
                    <EditorJs data={editorContent} holder="editorBox" tools={editorTools} instanceRef={instance => setEditor(instance)} onChange={()=> handleEditorSave()}>
                        <div id="editorBox"></div>
                    </EditorJs>
                </Card>
                <Button.Group floated="right" size="large">
                    <Button onClick={()=>history.replace(`/square/${postFormValues.community_id}/cat/${postFormValues.category_id}`)}>Cancel</Button>
                    <Button.Or />
                    <Button positive onClick={() => addNewPost()}>{
                                    isLoading === true?
                                        <Spinner animation="border" role="status" size="sm"></Spinner>
                                    :
                                        "Save"
                                }</Button>
                </Button.Group>
            </Container>
        </>
    )
}


export { CreatePostPage }
