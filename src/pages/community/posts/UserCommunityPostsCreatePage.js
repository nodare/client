import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { Container, Button, Form, Row, Col, Card, Toast, Spinner } from "react-bootstrap";

import EditorJs from 'react-editor-js'
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Link from "@editorjs/link";
import Image from "@editorjs/image";

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
        console.log("isLoading")
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
        console.log(postFormValues)
        setIsFinished(true)
    }

    return (
        <>
            <Container>
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
