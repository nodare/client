import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Breadcrumb,
    Row,
    Col,
    Card,
    Form,
    Spinner,
    Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ChangeLayoutButton from "components/shared/buttons/ChangeLayoutButtons";


import { CreateCommunityModal } from "components/shared/modals/CommunityModal";
import {Divider } from 'semantic-ui-react'
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock } from "@fortawesome/free-solid-svg-icons";
import { UserContextProvider } from 'pages/user/UserContextProvider'
import { UiContext } from 'pages'
import 'semantic-ui-css/semantic.min.css'

function ListPageComponent(props) {
    const ui = React.useContext(UiContext)
    const [createCommunityDialog, toggleCreateCommunityDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // const [communities, setCommunities] = useState([])  // string
    const [posts, setPosts] = useState([]) // array
    const [layout, setLayout] = useState('cards')

    const [search, setSearch] = useState({
        query: '',
        text: ''
    })

    const createNewCommunity = (data) => {
        props.createCommunity(data).then((res)=>{
            if(res){window.alert("community created")
            }else{
                window.alert("Failed")
            }
            console.log(res)
            props.getUsersCommunities(ui?.currentUser?.linear_id)
            props.getUsersBlogs(ui?.currentUser?.linear_id)
        })
    }

    useEffect(()=>{
        if(ui.currentUser){
            props.getUsersCommunities(ui?.currentUser?.linear_id)
            props.getUsersBlogs(ui?.currentUser?.linear_id)
            setIsLoading(false)
            console.log(ui.currentUser)
        }
        return()=>{
            props.clearCommunityItems()
        }
    }, [ui])
    useEffect(()=>{
        props.getUsersCommunities(ui?.currentUser?.linear_id)
        props.getUsersBlogs(ui?.currentUser?.linear_id)
        return()=>{
            props.clearCommunityItems()
        }
    },[createCommunityDialog])
    
    useEffect(() => {
        console.log("searching")
    }, [search.text])

    

    return (
        <>
        <UserContextProvider>
            
        </UserContextProvider>
            <Container>

                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Communities
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h2>My Communities</h2>

                {
                    props.communityItems.length > 0 ?
                        <>
                            <Row>
                                <Col sm={6}>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Control type="text" value={search.text} placeholder="Search for a community" onChange={e => setSearch({...search, text: e.target.value})}/>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                </Col> 
                                <Col sm={6} className="text-right">
                                    <Button variant="primary" onClick={() => toggleCreateCommunityDialog(!createCommunityDialog)}><FontAwesomeIcon icon={faPlus}/> New Community</Button>
                                    <ChangeLayoutButton handleChangeLayout={setLayout}/>
                                </Col> 
                            </Row>
                        </>
                    :""
                }
                
                {
                    isLoading === true?
                        (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="dark"></Spinner>
                            </div>
                        )
                    :
                        (
                            <>
                                {
                                    props.communityItems?.length > 0 ? 
                                    <>
                                        <Row>
                                            {props.communityItems?.map((community, i)=>{
                                                switch(layout){
                                                    case 'cards':
                                                        return(
                                                        <Col sm={6} md={4} xl={3} key={`com-${i}`}>
                                                            <LinkContainer to={`/square/${community.addr}`}>
                                                                <Card bg="light" text="white">
                                                                    <Card.Img src="http://placekitten.com/300/300"/>
                                                                    <Card.ImgOverlay style={{padding:"0px"}}>
                                                                    <Card.Body className="w-100" style={
                                                                        {
                                                                            position:"absolute",
                                                                            bottom:"0px",
                                                                            minHeight:"110px",
                                                                            maxHeight:"100%",
                                                                            overflow:"hidden",
                                                                            background:"rgba(0,0,0,0.6)"
                                                                        }
                                                                        }>
                                                                        <Card.Title className="h6">{community.title}</Card.Title>
                                                                        <Card.Text style={{fontSize:"13px"}}>{community.description}</Card.Text>
                                                                    </Card.Body>
                                                                    </Card.ImgOverlay>
                                                                </Card>
                                                            </LinkContainer>
                                                        </Col>
                                                        )
                                                    case 'list':
                                                        return(
                                                            <Col xs={12} key={`com-${i}`}>
                                                                
                                                                <LinkContainer to={`/square/${community.addr}`} style={{cursor: "pointer"}}>
                                                                    <Card className="px-3 py-2 my-2">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="text-left">
                                                                                <h4>{community?.title} {community?.isVisible === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</h4>
                                                                                <span>{community?.description}</span>
                                                                            </div>
                                                                            {/* <small className="text-center">{community?.community_type === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</small> */}
                                                                        </div>
                                                                    </Card>
                                                                </LinkContainer>
                                                            </Col>
                                                        )
                                                    default:
                                                        break;
                                                }
                                            })}
                                        </Row>
                                    </>
                                    :
                                    <>
                                        <Card>
                                            <Card.Body className="text-center">
                                                <p>
                                                    You have no communities as of now.
                                                </p>
                                                <Button 
                                                    variant="primary" 
                                                    onClick={() => toggleCreateCommunityDialog(!createCommunityDialog)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus}/> Create new community
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </>
                                }
                                <Divider/>
                                <h2>My Blogs</h2>

                                {
                                    props.blogItems?.length > 0 ?
                                        <>
                                            <Row>
                                                <Col sm={6}>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Control type="text" value={search.text} placeholder="Search for a community" onChange={e => setSearch({...search, text: e.target.value})}/>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>
                                                </Col> 
                                                <Col sm={6} className="text-right">
                                                    <Button variant="primary" onClick={() => toggleCreateCommunityDialog(!createCommunityDialog)}><FontAwesomeIcon icon={faPlus}/> New Blog</Button>
                                                    <ChangeLayoutButton handleChangeLayout={setLayout}/>
                                                </Col> 
                                            </Row>
                                        </>
                                    :""
                                }
                                {
                                    props.blogItems?.length > 0 ? 
                                    <>
                                        <Row>
                                            {props.blogItems?.map((blog, i)=>{
                                                switch(layout){
                                                    case 'cards':
                                                        return(
                                                        <Col sm={6} md={4} xl={3} key={`com-${i}`}>
                                                            <LinkContainer to={`/square/${blog.addr}`}>
                                                                <Card bg="light" text="white">
                                                                    <Card.Img src="http://placekitten.com/300/300"/>
                                                                    <Card.ImgOverlay style={{padding:"0px"}}>
                                                                    <Card.Body className="w-100" style={
                                                                        {
                                                                            position:"absolute",
                                                                            bottom:"0px",
                                                                            minHeight:"110px",
                                                                            maxHeight:"100%",
                                                                            overflow:"hidden",
                                                                            background:"rgba(0,0,0,0.6)"
                                                                        }
                                                                        }>
                                                                        <Card.Title className="h6">{blog.title}</Card.Title>
                                                                        <Card.Text style={{fontSize:"13px"}}>{blog.description}</Card.Text>
                                                                    </Card.Body>
                                                                    </Card.ImgOverlay>
                                                                </Card>
                                                            </LinkContainer>
                                                        </Col>
                                                        )
                                                    case 'list':
                                                        return(
                                                            <Col xs={12} key={`com-${i}`}>
                                                                
                                                                <LinkContainer to={`/square/${blog.addr}`} style={{cursor: "pointer"}}>
                                                                    <Card className="px-3 py-2 my-2">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="text-left">
                                                                                <h4>{blog?.title} {blog?.isVisible === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</h4>
                                                                                <span>{blog?.description}</span>
                                                                            </div>
                                                                            {/* <small className="text-center">{community?.community_type === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</small> */}
                                                                        </div>
                                                                    </Card>
                                                                </LinkContainer>
                                                            </Col>
                                                        )
                                                    default:
                                                        break;
                                                }
                                            })}
                                        </Row>
                                    </>
                                    :
                                    <>
                                        <Card>
                                            <Card.Body className="text-center">
                                                <p>
                                                    You have no blogs as of now.
                                                </p>
                                                <Button 
                                                    variant="primary" 
                                                    onClick={() => toggleCreateCommunityDialog(!createCommunityDialog)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus}/> Create new blog
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </>
                                }
                            </>
                        )
                }




            </Container>
            <CreateCommunityModal
                isShow={createCommunityDialog}
                toggleTrigger={() => toggleCreateCommunityDialog(false)}
                handleCreateCommunity={createNewCommunity}
            ></CreateCommunityModal>
        </>
    )
}

export { ListPageComponent }