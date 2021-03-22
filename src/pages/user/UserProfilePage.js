import React from 'react'
import { Container, Card, Row, Col, Image, Table } from "react-bootstrap";

function UserProfile() {
    return (
        <>

            <Container>
                <h3>User Profile</h3>
                <Row>
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <div className="w-100 text-center">
                                    
                                    <Image 
                                        src={"https://placekitten.com/200/200"}
                                        style={{height:'150px'}}
                                        className="my-3"
                                        roundedCircle
                                    ></Image>

                                    <h4>User's Name</h4>

                                    <hr/>
                                    
                                    <Table
                                        size={'sm'}
                                        borderless
                                        responsive
                                    >
                                        <tr>
                                            <td><strong>Communities</strong></td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Registered</strong></td>
                                            <td>02/23/2020</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Last logged in:</strong></td>
                                            <td>14 minutes ago</td>
                                        </tr>
                                    </Table>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <strong>Recent Activities</strong>
                                
                            </Card.Body>
                        </Card>

                        {/* list of communities */}
                        <Card className="py-2 my-2">
                            <Card.Body>
                                <strong>User's communities</strong>
                                <Row>

                                    <Col xs={6} md={4} xl={3}>
                                        <Card className="p-2 mb-2">
                                            <Image src="https://placekitten.com/200/200" fluid></Image>
                                            <div className="text-center">
                                                <span>
                                                    Community Name
                                                </span>
                                            </div>
                                        </Card>
                                    </Col>
                                    

                                    <Col xs={6} md={4} xl={3}>
                                        <Card className="p-2 mb-2">
                                            <Image src="https://placekitten.com/200/200" fluid></Image>
                                            <div className="text-center">
                                                <span>
                                                    Community Name
                                                </span>
                                            </div>
                                        </Card>
                                    </Col>
                                    

                                    <Col xs={6} md={4} xl={3}>
                                        <Card className="p-2 mb-2">
                                            <Image src="https://placekitten.com/200/200" fluid></Image>
                                            <div className="text-center">
                                                <span>
                                                    Community Name
                                                </span>
                                            </div>
                                        </Card>
                                    </Col>
                                    

                                    <Col xs={6} md={4} xl={3}>
                                        <Card className="p-2 mb-2">
                                            <Image src="https://placekitten.com/200/200" fluid></Image>
                                            <div className="text-center">
                                                <span>
                                                    Community Name
                                                </span>
                                            </div>
                                        </Card>
                                    </Col>
                                    
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserProfile
