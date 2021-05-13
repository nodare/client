import React, {useState} from 'react'
import { Nav, Navbar, NavDropdown, Container, Row, Col, Tooltip, OverlayTrigger, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBell,
    faEnvelope,
    faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";

import MessagingWindow from "components/messaging/MessagingWindow";

function UserNavbarComponent(props) {
    const [messagingWindow, showMessagingWindow] = useState(false)

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
                            {/* <Nav.Link href="/notifications">
                                <OverlayTrigger 
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id={"notificationsTooltip"}>
                                            2 new notifications
                                        </Tooltip>
                                    }
                                    >
                                        <>
                                            <FontAwesomeIcon icon={faBell} />
                                            <Badge pill variant={"danger"}>2</Badge>
                                        </>
                                </OverlayTrigger>
                            </Nav.Link> */}
                            
                            <Nav.Link href="/store">
                                <FontAwesomeIcon icon={faShoppingBasket}/>
                            </Nav.Link>
                            <Nav.Link onClick={showMessagingWindow}>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </Nav.Link>
                            {
                                props.isLoggedIn === false?
                                    <Nav.Link href="/login">
                                        Login
                                    </Nav.Link>
                                :
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
                                            <Link to="/square">
                                                Communities
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/messenger">
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

                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MessagingWindow
                isOpen={messagingWindow}
                toggleTrigger={showMessagingWindow}
                onHide={() => showMessagingWindow(false)}
            ></MessagingWindow>
        </>
    )
}

export default UserNavbarComponent
