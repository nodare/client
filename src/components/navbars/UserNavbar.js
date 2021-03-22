import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserNavbarComponent() {

    const toggleDarkMode = () => {
        console.log("toggling dark mode")
    }
    
    return (
        <>
            <Navbar bg={'light'} expand="lg">
                <Container>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/home">
                                <Navbar.Brand><strong>NODAQ</strong></Navbar.Brand>
                            </Link>
                        </Nav>
                        <Nav>
                            <Nav.Link>
                                <Link to="/notifications">
                                    Notifications
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/store">
                                    Store
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/login">
                                    Login
                                </Link>
                            </Nav.Link>
                            <NavDropdown title="Account">
                                <NavDropdown.Item>
                                    {/* account keme root */}
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/me">
                                        Profile
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/community">
                                        Communities
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link to="/messages">
                                        Messages
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>
                                    <Link to="/settings">
                                        Settings
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>toggleDarkMode()}>Dark Mode</NavDropdown.Item>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default UserNavbarComponent
