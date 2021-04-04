import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Breadcrumb,
    Row,
    Col,
    Jumbotron, 
    Card,
    Form,
    Spinner
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ChangeLayoutButton from "./../../components/shared/buttons/ChangeLayoutButtons";

import { communities as staticCommunities } from "./../../static";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faThLarge, faSearch } from "@fortawesome/free-solid-svg-icons";


function UserCommunityListPage() {
    const [communities, setCommunities] = useState([])
    const [isLoading, setIsLoading] = useState(true) // boolean
    const [search, setSearch] = useState({
        query: '',
        text: ''
    })
    // const [communities, setCommunities] = useState([])  // string
    const [posts, setPosts] = useState([]) // array
    const [layout, setLayout] = useState('cards')

    useEffect(()=>{
        setTimeout(() => {
            fetchCommunities()
            setIsLoading(false)
        }, 1000);
    }, [])
    
    useEffect(() => {
        console.log("searching")
    }, [search.text])

    
    const fetchCommunities = async () => {
        
        // place code to get communities from the api
        await setCommunities(staticCommunities)
    }
        

    return (
        <>
            <Container>

                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Communities
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Jumbotron>
                    <h2>My Communities</h2>
                </Jumbotron>

                <Row>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Control type="text" value={search.text} placeholder="Search for a community" onChange={e => setSearch({...search, text: e.target.value})}/>
                        </Form.Group>
                    </Col> 
                    <Col sm={6} className="text-right">
                        <ChangeLayoutButton handleChangeLayout={setLayout}/>
                    </Col> 
                </Row>
                {
                    isLoading === true?
                        (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="dark"></Spinner>
                            </div>
                        )
                    :
                        (
                            <Row>
                                {communities.map((community, i)=>{
                                    switch(layout){
                                        case 'cards':
                                            return(
                                                <Col sm={6} md={4} xl={3} key={`com-${i}`}>
                                                    <LinkContainer to={`/community/${community.id}`} style={{cursor: "pointer"}}>
                                                        <Card className="my-3">
                                                            <Card.Body>
                                                                <h4 className="text-center">{community?.name}</h4>
                                                                <p className="text-center">{community?.description}</p>
                                                                <p className="text-center"><small>Date created: {community?.dateCreated}</small></p>
                                                            </Card.Body>
                                                        </Card>
                                                    </LinkContainer>
                                                </Col>
                                            )
                                        case 'list':
                                            return(
                                                <Col xs={12} key={`com-${i}`}>
                                                    
                                                    <LinkContainer to={`/community/${community.id}`} style={{cursor: "pointer"}}>
                                                        <Card className="px-3 py-2 my-2">
                                                            <div className="d-flex justify-content-between">
                                                                <div className="text-left">
                                                                    <h4>{community?.name}</h4>
                                                                    <p>{community?.description}</p>
                                                                </div>
                                                                <p><small>Date created: {community?.dateCreated}</small></p>
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
                        )
                }




            </Container>
        </>
    )
}

export default UserCommunityListPage
