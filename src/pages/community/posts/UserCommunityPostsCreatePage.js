import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { useHistory } from "react-router";
import { Alert, Container, Button, Form, Row, Col, Card, Toast, Spinner, Breadcrumb } from "react-bootstrap";

import EditorJs from 'react-editor-js'
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
// import Link from "@editorjs/link";
import Image from "@editorjs/simple-image";

// import { fetchUsersCommunities, createNewPost, addNewPostContents } from "./../../../services/community.service";
import { getUsersCommunities, getCommunityCategories,clearCommunityItems, clearCategoryItems} from "util/redux/actions/community.actions";
import { addNewPost, addNewPostContents } from "util/redux/actions/posts.actions";

import { accountId } from "static";

function UserCommunityPostsCreatePage(props) {
    const history = useHistory()
    const [postFormValues, setPostFormValues] = useState({
        title: '',
        community_id: '',
        category_id: '0'
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
    
    const loadOptions = () => {
        props.getUsersCommunities(accountId)
    }

    useEffect(()=>{
        // wat
        if(userCommunities.length > 0) setUserCommunities([])
        loadOptions()
    }, [])

    useEffect(()=>{
        props.getCommunityCategories(postFormValues.community_id)
        console.log("getting")
    }, [postFormValues.community_id])

    

    const handleEditorSave = async () => {
        setIsLoading(true)
        const savedData = await editor.save()
        setTimeout(() => {
            setEditorContent(savedData.blocks)
            setPostContents(savedData.blocks)
            setIsLoading(false)
        }, 500);
    }

    // may problem dito. late kinukuha length
    const handleChangeCommunity = communityLinearId => {
        setPostFormValues({...postFormValues, community_id: communityLinearId })
        console.log(postFormValues)
    }

    const addNewPost = () => {
        if(postFormValues.title === null) return window.alert("Please include a title in your post. ")
        if(postFormValues.community === null) return window.alert("Please select which community to post. ")
        if(postContents.length === 0) return window.alert("Editor is empty. Please write something. ")
        if(postContents.category_id === ""){
            postContents.category_id = 0
        }

        let data = postFormValues
        data.user_id = accountId

        props.addNewPost(data)
        .then(newPost=>{
            props.addNewPostContents( newPost.payload.linear_id, postContents)
            .then(res=>{
                window.alert("Post successfully created!")
                history.replace(`/square/${data.community_id}`)
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
                                    <option value="0">--No Category--</option>
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
            <></>
        </>
    )
}

const mapStateToProps = state => ({
    communities: state.community.items,
    categories: state.community.categoryItems,
})

const mapDispatchToProps = {
    getUsersCommunities, 
    getCommunityCategories,
    addNewPost,
    addNewPostContents,
    clearCommunityItems, 
    clearCategoryItems
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCommunityPostsCreatePage)
