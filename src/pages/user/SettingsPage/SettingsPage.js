import React, { useState } from 'react'
import { Button, Card, Row, Col, Nav, Tab, Table, Form, Image} from 'react-bootstrap'
import axios from 'axios'

import { serverUrl } from "static";



const UserSettingsPageComponent = ({user}) => {
    const [image, setImage] = useState(null)
    
    const selectImage = e => {
        setImage(e.target.files[0])
        console.log(image)
    }

    const uploadProfileImage = () => {
        if(!image){
            window.alert("No image uploaded")
            return
        }
        let fd = new FormData()
        fd.set('userProfilePicture', image, image.name)
        axios.post(`users/upload/profile/${user.linear_id}`, fd, { headers: {"Content-type": "multipart/form-data"} })
        .then((res)=>{
            console.log(res)
            window.alert("Image uploaded successfully")
        })
        .catch(err=>{
            console.log(err)
        })
    }
    

    return (
        <>
            <Tab.Container defaultActiveKey="account">
                <Row>
                    <Col xs={3}>
                        <h2>Settings</h2>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Link eventKey="account">Account</Nav.Link>
                            <Nav.Link eventKey="profile">Profile</Nav.Link>
                            <Nav.Link eventKey="security">Security</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={9}>
                        <Tab.Content>
                            
                            <Tab.Pane eventKey="account">
                                
                                <Card>
                                    <Card.Header>General</Card.Header>
                                    <Card.Body>

                                        <Row>
                                            <Col xs={12} md={2} className="text-right">Name</Col>
                                            <Col xs={12} md={9}>asdf</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={2} className="text-right">Username</Col>
                                            <Col xs={12} md={9}>{user?.username}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={2} className="text-right">Contact</Col>
                                            <Col xs={12} md={9}>{user?.contact}</Col>
                                        </Row>
                                        
                                    </Card.Body>
                                </Card>

                            </Tab.Pane>
                                
                            <Tab.Pane eventKey="profile">
                                <Card>
                                    <Card.Header>Profile</Card.Header>
                                    <Card.Body>

                                        <Row>
                                            <Col xs={12} md={2} className="text-right">Profile Picture</Col>
                                            <Col xs={12} md={9}>
                                                {!image === null?
                                                    <>
                                                        <Image
                                                            src={`${image?.name}`}
                                                            style={{height: "100px", width: "100px"}}
                                                            thumbnail
                                                        />
                                                    </>
                                                :
                                                    <>
                                                        <Image
                                                            src={`${serverUrl}images/users/${user?.linear_id}/${user?.current_image?.photo_orig_name}`}
                                                            style={{height: "100px", width: "100px"}}
                                                            thumbnail
                                                        />
                                                    </>
                                                }
                                                <Form.Group>
                                                    <Form.Label>Update Profile Picture</Form.Label>
                                                    <Form.Control type="file" onChange={e => selectImage(e)}/>
                                                </Form.Group>
                                                <Button variant="success" onClick={() => uploadProfileImage()}>Save Changes</Button>
                                            </Col>
                                        </Row>
                                        
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            
                            <Tab.Pane eventKey="security">
                                    
                                <h4>Security and Login</h4>
                                <Table size="md" borderless responsive>
                                    <tr>
                                        <td className="text-left">
                                            <span className="btn-link text-danger" style={{cursor: "pointer"}}>Change Password</span>
                                        </td>
                                    </tr>
                                    
                                </Table>

                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export { UserSettingsPageComponent }
