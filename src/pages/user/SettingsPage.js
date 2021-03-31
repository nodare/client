import React from 'react'
import { Row, Col, Nav, Tab, Table } from 'react-bootstrap'


function SettingsPage() {
    return (
        <>
            <Tab.Container defaultActiveKey="account">
                <Row>
                    <Col xs={3}>
                        <h2>Settings</h2>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Link eventKey="account">Account</Nav.Link>
                            <Nav.Link eventKey="security">Security</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={9}>
                        <Tab.Content>
                            
                            <Tab.Pane eventKey="account">
                                <h4>Account Settings</h4>
                                
                                <Table size="md" borderless responsive>
                                    
                                    <tr>
                                        <td className="text-left">
                                            <strong>Name</strong>
                                        </td>
                                        <td className="text-left">John doe</td>
                                        <td className="text-right">
                                            <span className="btn-link" style={{cursor: "pointer"}}>Edit</span>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td className="text-left">
                                            <strong>Username</strong>
                                        </td>
                                        <td className="text-left">johndoe123</td>
                                        <td className="text-right">
                                            <span className="btn-link" style={{cursor: "pointer"}}>Edit</span>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td className="text-left">
                                            <strong>Contact</strong>
                                        </td>
                                        <td className="text-left">Primary: johndoe123@gmail.com</td>
                                        <td className="text-right">
                                            <span className="btn-link" style={{cursor: "pointer"}}>Edit</span>
                                        </td>
                                    </tr>

                                </Table>

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

export default SettingsPage
