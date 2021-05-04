import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom";
import { Alert, Container, Button, Form, Row, Col, Card, Toast, Spinner, Breadcrumb } from "react-bootstrap";

import EditorJs from 'react-editor-js'
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
// import Link from "@editorjs/link";
import Image from "@editorjs/simple-image";

import { fetchUsersCommunities, createNewPost, addNewPostContents } from "./../../../services/community.service";

import { accountId } from "./../../../static";

function UserCommunityPostsCreatePage() {
    const [postFormValues, setPostFormValues] = useState({
        title: '',
        community_id: '',
        category_id: ''
    })
    const [postContents, setPostContents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [editor, setEditor] = useState(null)
    const [editorContent, setEditorContent] = useState(null)
    const editorTools = {
        header: Header,
        paragraph: Paragraph,
        list: List,
        quote: Quote,
        table: Table,
        link: Link,
        image: Image
    }
    const [toast, setToast] = useState({
        isVisible: true,
        message: ""
    })

    const [userCommunities, setUserCommunities] = useState([])
    const [userCategories, setUserCategories] = useState([])

    useEffect(()=>{
        if(userCommunities.length > 0) setUserCommunities([])
        fetchUsersCommunities(accountId)
        .then(res=>{
            setUserCommunities(res)
        })
        .catch(err=>{
            console.log("err")
            console.log(err)
        })
    }, [])

    
    const userCommunityOptions = userCommunities.map((community)=>{
        return(
            <option key={community.id} value={community.linearId}>{community.title}</option>
        )
    })

    const handleEditorSave = async () => {
        setIsLoading(true)
        const savedData = await editor.save()
        setTimeout(() => {
            setEditorContent(savedData.blocks)
            setPostContents(savedData.blocks)
            setIsLoading(false)
        }, 500);
    }

    const handleChangeCommunity = async communityName => {
        setPostFormValues({...postFormValues, community_id: communityName })
    }

    /* 
        DATA:
            categoryId : string
            community : string
            contents : Array({
                data:{
                    text: string
                },
                type: string
            })
    */
    const addNewPost = () => {
        if(postFormValues.title === null) return window.alert("Please include a title in your post. ")
        if(postFormValues.community === null) return window.alert("Please select which community to post. ")
        if(postContents.length === 0) return window.alert("Editor is empty. Please write something. ")

        let data = postFormValues
        data.community_id = userCommunities.find(community=> community.title === postFormValues.community_id).linear_id

        createNewPost(data)
        .then(payload=>{
            addNewPostContents( payload.id, postContents)
            .then(res=>{
                window.alert("Post successfully created!")
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })

        setIsFinished(true)
    }


    return (
        <>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/square">Community</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Post</Breadcrumb.Item>
                </Breadcrumb>
                <Alert variant={"warning"}>
                    <b>NOTE:</b> For <b className="text-danger">Non-subscribed users</b>, please note that you are only allowed to create contents only up to <b className="text-danger">10 blocks.</b> You can create more blocks by subscribing <Link to="/store">here.</Link>
                </Alert>
                <Alert variant={"danger"}>
                    <b>NOTE:</b> Images are not yet available at this time.
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
                                    {userCommunityOptions}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" custom value={postFormValues.category_id} onChange={e=>setPostFormValues({...postFormValues, categoryId: e.target.value})}>
                                    <option disabled value="">--No Category--</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Button block variant="primary w-100" onClick={() => addNewPost()} disabled={isLoading}>
                                {
                                    isLoading === true?(
                                        <Spinner animation="border" role="status"></Spinner>
                                    ):(
                                        <span>Save post and publish</span>
                                    )
                                }
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Card className="p-3 my-3">
                    {/* <div id="editorBox"/> */}
                    <EditorJs data={editorContent} holder="editorBox" tools={editorTools} instanceRef={instance => setEditor(instance)} onChange={()=> handleEditorSave()}>
                        <div id="editorBox"></div>
                    </EditorJs>
                </Card>
            </Container>
            <Toast show={toast.isVisible} delay={1000} autohide onClose={() => setToast({isVisible: false})}>
                <Toast.Body>
                    {toast.message}
                </Toast.Body>
            </Toast>
            {
                isFinished === false?null:(
                    <Redirect push to="/square"></Redirect>
                )
            }
            <></>
        </>
    )
}

export default UserCommunityPostsCreatePage
