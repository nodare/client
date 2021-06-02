import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux';
import { Nav, Navbar, NavDropdown, Container, Card, Image, Row, Col, Tooltip, OverlayTrigger, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBell,
    faEnvelope,
    faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";

import { UiContext } from "pages/index";
import { serverUrl } from "static";

import MessagingWindow from "components/messaging/MessagingWindow";
import { logoutUser } from "util/redux/actions/auth.actions";



function UserNavbarComponent(props) {
    const history = useHistory()
    const ui = useContext(UiContext)
    const [user, setUser] = useState(null)
    const [messagingWindow, showMessagingWindow] = useState(false)

    const toggleDarkMode = () => {
        console.log("toggling dark mode")
    }
    
    const logoutUser = () => {
        props.logoutUser()
        localStorage.removeItem('token')
        ui.setIsLoggedIn(false)
        window.alert("You are successfully logged out!")
        history.push('/login')
    }

    useEffect(() => {
        setUser(props.user)
    }, [user])
    
    return (
        <>
            {
                ui.currentUser?
                    !ui.currentUser?.isVerified?
                        <div className="bg-dark text-white text-center py-1">
                            Your account is not yet verified! <u>Click</u> to verify your account!
                        </div>
                    :""
                :""
            }
            <Navbar bg={'light'} expand="lg">
                <Container>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/">
                                <Navbar.Brand><strong>NODAQ</strong> Home</Navbar.Brand>
                            </Link>
                        </Nav>
                        <Nav>                            
                            {
                                ui.isLoggedIn === false?
                                    <Nav.Link href="/login">
                                        Login
                                    </Nav.Link>
                                :
                                    <>
                                        <Nav.Link href="/store">
                                            <FontAwesomeIcon icon={faShoppingBasket}/>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <LinkContainer to="/messenger">
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </LinkContainer>
                                        </Nav.Link>
                                        <NavDropdown title="Account">
                                            <LinkContainer to="/me">
                                                <NavDropdown.Item>
                                                    <div className="d-flex justify-content my-1">
                                                        <Image src={`${serverUrl}images/users/${user?.linear_id}/${user?.current_image?.photo_orig_name}`} style={{height: "25px"}} className="mr-2" roundedCircle/>
                                                        {/* <Image src={"http://placekitten.com/100/100"} style={{height: "25px"}} className="mr-2" roundedCircle/> */}
                                                        <span>{ui?.currentUser?.username}</span>
                                                    </div>
                                                </NavDropdown.Item>
                                            </LinkContainer>
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
                                            <NavDropdown.Item onClick={()=>logoutUser()}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
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

const mapDispatchToProps = {
    logoutUser
}
export default connect(null, mapDispatchToProps)(UserNavbarComponent)
