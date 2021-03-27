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

function UserCommunityPostsCreatePage() {
    const [postFormValues, setPostFormValues] = useState({
        title: null,
        communityId: null,
        categoryId: null,
        contents: Array()
    })
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



    const handleEditorSave = async () => {
        setIsLoading(true)
        const savedData = await editor.save()
        setTimeout(() => {
            setEditorContent(savedData.blocks)
            setPostFormValues({...postFormValues, contents: savedData.blocks})
            setIsLoading(false)
        }, 500);
    }

    const addNewPost = () => {
        /* 
            DATA:
                categoryId : string
                communityId : string
                contents : Array({
                    data:{
                        text: string
                    },
                    type: string
                })
        */
        if(postFormValues.title === null) return window.alert("Please include a title in your post. ")
        if(postFormValues.communityId === null) return window.alert("Please select which community to post. ")
        if(postFormValues.contents.length === 0) return window.alert("Editor is empty. Please write something. ")
        console.log(postFormValues)
        setIsFinished(true)
    }

    return (
        <>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/community">Community</Breadcrumb.Item>
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
                                <Form.Control as="select" value={postFormValues.communityId} onChange={e=>setPostFormValues({...postFormValues, communityId: e.target.value})}>
                                    <option>123</option>
                                    <option>asdfasf</option>
                                    <option>asdfasf</option>
                                    <option>asdfasf</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" value={postFormValues.categoryId} onChange={e=>setPostFormValues({...postFormValues, categoryId: e.target.value})}>
                                    <option>cat1</option>
                                    <option>cat2</option>
                                    <option>caty3</option>
                                    <option>cate4</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                            <Button block variant="primary w-100" onClick={addNewPost} disabled={isLoading}>
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
                    <Redirect push to="/community"></Redirect>
                )
            }
            <></>
        </>
    )
}

export default UserCommunityPostsCreatePage
