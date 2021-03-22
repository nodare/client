import React, { useState, useEffect} from 'react';
import { 
    Container, 
    Button,
    Nav, 
    Navbar, 
    Jumbotron, 
    Card, 
    Form, 
    NavDropdown, 
    Image,
    Table,
    Spinner
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';


function UserCommunityListPage() {
    const [isLoading, setIsLoading] = useState(true) // boolean
    const [tab, setTab] = useState('list') // string
    const [communities, setCommunities] = useState([])  // string
    const [selectedCommunity, setSelectedCommunity] = useState(111) // string
    const [posts, setPosts] = useState([]) // array
    
    useEffect(() => {
        setTimeout(() => {
            fetchCommunities()
            console.log('test')
        }, 1000);

        return () => {
            console.log("clean7up")
            setIsLoading(false)
            setPosts([])
        }
    }, [communities, posts])

    const handleChangeTab = (tabname, category = null) => {
        console.log("changing tab")
        setTab(tabname)
        if(tab === "list"){
            handleChangeCommunity(111)

        }
    }
    
    const fetchCommunities = () => {
        console.log("fetching communities")
        fetchPosts(111,222)
    }

    const handleChangeCommunity = communityId => {
        console.log("changing community")
        if(tab !== "list") handleChangeTab("list")
        setSelectedCommunity(communityId)
        fetchPosts(communityId,222)
    }



    const fetchPosts = (communityId, categoryId = null) => {
        setIsLoading(true)
        console.log("fetching posts")
        setIsLoading(false)
    }
        
    return (
        <>
            <Container>

                <Jumbotron>
                    <h2>My Communities</h2>
                </Jumbotron>
                
                <Navbar bg={'light'} expand="lg">
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link href="#">
                                {/* comments here */}
                                <Form.Group>
                                    <Form.Control as="select" onChange={() => handleChangeCommunity(111)}>
                                        <option>name1</option>
                                        <option>name2</option>
                                        <option>test</option>
                                        <option>mew cat</option>
                                        <option>pikachu</option>
                                        <option>name1</option>
                                    </Form.Control>
                                </Form.Group>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Link to="/community/create">
                                    <Button variant="primary">Create Community</Button>
                                </Link>
                            </Nav.Item>
                            <NavDropdown title="More">
                                <NavDropdown.Item onClick={() => handleChangeTab("status")}>Status</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleChangeTab("recentactivity")}>Activity Log</NavDropdown.Item>
                                <NavDropdown.Item>Hide/show</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={() => handleChangeTab("settings")}>Settings</NavDropdown.Item>
                                <NavDropdown.Item className="text-danger">Delete Community</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                
                    <>
                        {
                            isLoading === true?(
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="dark"></Spinner>
                                </div>
                            ):(
                                /* communities */
                                tab === 'list'?        
                                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                                        <Masonry>
                                            <Link to="/community/post/create">
                                                <Card className="p-3 mb-2 mx-1">
                                                    <h4 className="text-center">Create new post</h4>
                                                </Card>
                                            </Link>
                                            <Link to="/community/post/123">
                                                <Card className="p-3 mb-2 mx-1">
                                                    <Image src="https://placekitten.com/200/250" fluid></Image>
                                                    <div className="text-center py-2">
                                                        <h4>
                                                            Community Name
                                                        </h4>
                                                    </div>
                                                </Card>
                                            </Link>
                                            <Link to="/community/post/234">
                                                <Card className="p-3 mb-2 mx-1">
                                                    <Image src="https://placekitten.com/200/150" fluid></Image>
                                                    <div className="text-center py-2">
                                                        <h4>
                                                            Community Name
                                                        </h4>
                                                    </div>
                                                </Card>
                                            </Link>
                                            
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/200" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/250" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/150" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/200" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/300" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/299" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                            <Card className="p-3 mb-2 mx-1">
                                                <Image src="https://placekitten.com/200/200" fluid></Image>
                                                <div className="text-center py-2">
                                                    <h4>
                                                        Community Name
                                                    </h4>
                                                </div>
                                            </Card>
                                        </Masonry>
                                    </ResponsiveMasonry>
                                :""
                            )
                        }
                    </>
                    
                {/* settings */}
                {tab === 'settings'?
                    <>
                        <Table borderless>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>asdfasdf <a href="#">Change</a></td>
                            </tr>
                            <tr>
                                <td className="text-info">Change community settings</td>
                            </tr>
                            <tr>
                                <td className="text-danger">Delete Community</td>
                            </tr>
                        </Table>
                    </>
                :""}

                {/* settings */}
                {tab === 'settings'?
                    <>
                        <Table borderless>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>asdfasdf <a href="#">Change</a></td>
                            </tr>
                            <tr>
                                <td className="text-info">Change community settings</td>
                            </tr>
                            <tr>
                                <td className="text-danger">Delete Community</td>
                            </tr>
                        </Table>
                    </>
                :""}

                {tab === 'recentactivity'?
                    <>
                        <span>today</span>
                        <Card className="my-2">
                            <Card.Body>
                                Someone has done something <small className="text-">55 minutes ago</small>
                            </Card.Body>
                        </Card>
                        <Card className="my-2">
                            <Card.Body>
                                Someone has done something <small className="text-">55 minutes ago</small>
                            </Card.Body>
                        </Card>
                        <span>Yesterday</span>
                        <Card className="my-2">
                            <Card.Body>
                                Someone has done something <small className="text-">55 minutes ago</small>
                            </Card.Body>
                        </Card>
                        <Card className="my-2">
                            <Card.Body>
                                Someone has done something <small className="text-">55 minutes ago</small>
                            </Card.Body>
                        </Card>
                    </>
                :""}





            </Container>
        </>
    )
}

export default UserCommunityListPage
