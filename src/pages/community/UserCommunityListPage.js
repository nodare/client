import React, { useState, useEffect} from 'react';
import { 
    Container, 
    Row,
    Col,
    Jumbotron, 
    Card,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";


function UserCommunityListPage() {
    const [isLoading, setIsLoading] = useState(true) // boolean
    const [communities, setCommunities] = useState([])  // string
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
    }, [])

    
    const fetchCommunities = () => {
        console.log("fetching communities")
    }
        
    return (
        <>
            <Container>

                <Jumbotron>
                    <h2>My Communities</h2>
                </Jumbotron>
                
                <Row>
                    <Col sm={6} md={4} xl={3}>
                        <LinkContainer to={"/community/123"}>
                            <Card className="my-3">
                                <Card.Body>
                                    <h4 className="text-center">Name of Community   </h4>
                                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing..</p>
                                    <p className="text-center"><small>Date created: Dec. 24, 2021</small></p>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                    <Col sm={6} md={4} xl={3}>
                        <LinkContainer to={"/community/123"}>
                            <Card className="my-3">
                                <Card.Body>
                                    <h4 className="text-center">Name of Community   </h4>
                                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing..</p>
                                    <p className="text-center"><small>Date created: Dec. 24, 2021</small></p>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                </Row>




            </Container>
        </>
    )
}

export default UserCommunityListPage
