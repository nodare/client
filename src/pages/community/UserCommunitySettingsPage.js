import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { connect } from 'react-redux'

import { Breadcrumb, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

import InfoModal from "components/shared/modals/common/InfoModal";

import { getCommunityData, updateCommunity, clearCommunityData } from "util/redux/actions/community.actions";


function UserCommunitySettingsPage(props) {
    const params = useParams()
    const history = useHistory()
    const fileData = new FormData()

    const [isLoading, setIsLoading] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    
    const [communitySettingsForm, setCommunitySettingsForm] = useState({})
    const [confirmDiscardModal, showConfirmDiscardModal] = useState(false)

    const loadCommunityData = () => {
        setIsLoading(true)
        props.getCommunityData(params.community_id)
        prefillForm()
        setIsLoading(false)
    }

    const prefillForm = () => {
        setCommunitySettingsForm(props.communityData)
    }

    const handleSaveSettings = (event) => {
        event.preventDefault()
        const formData = new FormData();
        
        props.updateCommunity(params.community_id, communitySettingsForm)
        .then(()=>{
            window.alert("Settings saved!")
            history.replace(`/square`)
        })
    }

    const handleFormInputChange = event => {
        setCommunitySettingsForm({...communitySettingsForm, [event.target.name]: event.target.value})
    }
    
    const handleImageUpload = event => {
        fileData.append('thumbnail_image', event.target.files[0])
        // console.log(event.target.files[0])
        console.log(fileData)
        
        setCommunitySettingsForm({...communitySettingsForm, [event.target.name]: event.target.files[0].name})
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
                    <Breadcrumb.Item href={`/square/${params.community_id}`}>{props.communityData.title}</Breadcrumb.Item>
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
                                
                                <Col xs={12} md={2} className="text-right">Title</Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="text" className="form-control" name={"title"} value={communitySettingsForm?.title} onChange={handleFormInputChange} required placeholder="Enter community title"/>
                                        <Form.Text className="text-muted">This field should not be empty</Form.Text>
                                    </Form.Group>
                                </Col>
                                
                                <Col xs={12} md={2} className="text-right">Description</Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <textarea className="form-control" name={"description"} value={communitySettingsForm?.description} onChange={handleFormInputChange} required placeholder="Write description here"></textarea>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={2} className="text-right">Thumbnail Image</Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <Form.File
                                            label={communitySettingsForm.thumbnail_image || "Upload thumbnail photo.."}
                                            name={"thumbnail_image"} 
                                            onChange={handleImageUpload} 
                                            data-browse={"Upload image"}
                                            custom
                                        />
                                        <Form.Text>Current: {props.communityData.thumbnail_image || "none"}</Form.Text>
                                    </Form.Group>
                                </Col>
                                
                                <Col xs={12} md={2} className="text-right">Visibility</Col>
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
                                
                                <Col xs={12} md={2} className="text-right">Upvote Name</Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="text" className="form-control" name={"upvote_name"} value={communitySettingsForm?.upvote_name} onChange={handleFormInputChange} placeholder="Enter upvote name"/>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={2} className="text-right">Upvoted Name</Col>
                                <Col xs={12} md={9}>
                                    <Form.Group>
                                        <input type="text" className="form-control" name={"upvoted_name"} value={communitySettingsForm?.upvoted_name} onChange={handleFormInputChange} placeholder="Enter upvoted name"/>
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


const mapStateToProps = (state) => ({
    communityData: state.community.item,
})

const mapDispatchToProps = {
    getCommunityData,
    updateCommunity,
    clearCommunityData
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCommunitySettingsPage)
