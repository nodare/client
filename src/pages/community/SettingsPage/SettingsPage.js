import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';

import { Breadcrumb, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import { UiContext } from 'pages'
import InfoModal from "components/shared/modals/common/InfoModal";
import axios from 'axios';

function SettingsPageComponent(props) {
    const params = useParams()
    const history = useHistory()
    const ui = React.useContext(UiContext)
    const fileData = new FormData()

    const [isLoading, setIsLoading] = useState(true)
    const [isChanged, setIsChanged] = useState(false)
    
    const [communitySettingsForm, setCommunitySettingsForm] = useState({})
    const [communityUploadedImages, setCommunityUploadedImages] = useState([])
    const [confirmDiscardModal, showConfirmDiscardModal] = useState(false)
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    
    const loadCommunityData = () => {
        props.getCommunityData(params.community_id)
        let data = {
            user_id:ui?.currentUser?.linear_id,
            community_id:params.community_id
        }
        console.log(ui?.currentUser?.linear_id)
        if(data.user_id){
        axios.post(`community/auth`,data).then((res)=>{
                if(res.data){
                    console.log(res.data)
                    if(res.data[0].status>=3){
                        setIsAuthenticated(true)
                    }else{
                        history.push(`/square/${params.community_id}`)
                    }
                }else{
                    history.push(`/square/${params.community_id}`)
                }
            })
        }else{
            history.push(`/square/${params.community_id}`)
        }
        prefillForm()
        setIsLoading(false)
    }

    const prefillForm = () => {
        setCommunitySettingsForm(props.community)
    }

    const handleSaveSettings = (event) => {
            if(isAuthenticated){
            event.preventDefault()
            console.log(fileData.entries())
            props.updateCommunity(params.community_id, communitySettingsForm)
            .then(()=>{
                console.log(fileData)
                console.log(communityUploadedImages)
                props.updateCommunityFiles(params.community_id, communityUploadedImages)
                .then((res)=>{
                    console.log(res)
                    window.alert("Settings saved!")
                    history.push(`/square/${params.community_id}`)
                })
            })
        }else{
            history.push(`/square/${params.community_id}`)
        }
    }

    const handleFormInputChange = event => {
        setCommunitySettingsForm({...communitySettingsForm, [event.target.name]: event.target.value})
    }
    
    const handleImageUpload = event => {
        fileData.append(event.target.name, event.target.files[0])
        setCommunitySettingsForm({...communitySettingsForm, [event.target.name]: event.target.files[0].name})
        setCommunityUploadedImages(prevState=>{
            return {...prevState, [event.target.name]: event.target.files[0]}
        })
    }
    
    const handleCheckboxChange = event => {
        setCommunitySettingsForm({...communitySettingsForm, [event.target.name]: event.target.checked})
        console.log(communitySettingsForm)
    }

    useEffect(() => {
        loadCommunityData()
        return()=>{
            props.clearCommunityData()
        }
    }, [])

    // reload community issue upon refresh
    return (
        <>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/square">
                        Communities
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/square/${params.community_id}`}>{props.community.title}</Breadcrumb.Item>
                    <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                </Breadcrumb>

                <h3>Community Settings</h3>
                {isLoading?
                    <p>Loading..</p>
                :""}
                <Form encType="multipart/form-data" onSubmit={handleSaveSettings}>

                    <Card className="my-3">
                        <Card.Header>
                            General
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                
                                <Col xs={12} md={2} className="text-right"><strong>Title</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="text" className="form-control" name={"title"} value={communitySettingsForm?.title} onChange={handleFormInputChange} required placeholder="Enter community title"/>
                                        <Form.Text className="text-muted">This field should not be empty</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={2} className="text-right"><strong>Description</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <textarea className="form-control" name={"description"} value={communitySettingsForm?.description} onChange={handleFormInputChange} required placeholder="Write description here"></textarea>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={2} className="text-right"><strong>Thumbnail Image</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <Form.File
                                            label={communitySettingsForm?.thumbnail_image || "Upload thumbnail photo.."}
                                            name={"thumbnail_image"} 
                                            onChange={handleImageUpload} 
                                            data-browse={"Upload image"}
                                            custom
                                            />
                                        <Form.Text>Current: {props?.community?.thumbnail_image || "none"}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={2} className="text-right"><strong>Visibility</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <Form.Check
                                            id={"visibility-switch"}
                                            type="switch"
                                            name={"isVisible"} 
                                            checked={communitySettingsForm?.isVisible} 
                                            onChange={handleCheckboxChange} 
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="my-3">
                        <Card.Header>Upvote Settings</Card.Header>
                        <Card.Body>
                            <Row>
                                
                                <Col xs={12} md={2} className="text-right"><strong>Upvote Name</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="text" className="form-control" name={"upvote_name"} value={communitySettingsForm?.upvote_name} onChange={handleFormInputChange} placeholder="Enter upvote name"/>
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                    
                    <Card className="my=3">
                        <Card.Header>Assistant Managers Settings</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={2} className="text-right"><strong>Managers</strong></Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="search"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <div className="text-right">
                        <Button type="submit" variant="success">Save Changes</Button>
                    </div>
                    
                </Form>
            </Container>

            {/* discard changes modal */}
            {isChanged?
                <InfoModal
                    isShow={confirmDiscardModal}
                    toggleTrigger={showConfirmDiscardModal}
                    header={"Discard Changes"}
                    text={"Are you sure you want to discard changes"}
                    handleConfirmModal={() => console.log("test")}
                    confirmButtonText={"Discard"}
                />
            :""}
        </>
    )
}


export { SettingsPageComponent }
