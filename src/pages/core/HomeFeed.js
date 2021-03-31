import React, { useState, useEffect } from 'react'
import { Tab, Nav, Row, Col, Form, Card, Spinner, Button } from "react-bootstrap";
import { communityCategories } from "./../../static";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch
} from "@fortawesome/free-solid-svg-icons";

function HomeFeed() {
    const [search, setSearch] = useState({
        text: "",
        hasQuery: false,
        query: "",
        result: []
    })
    const [isLoading, setIsLoading] = useState(false)

    const onChangeSearchBox = event => {
        if(event.target.value === ""){
            setSearch({...search, hasQuery: false, query: ""})
            return
        }
        setSearch({...search, text: event.target.value})
    }

    const handleSearch = () => {
        if(search.text === ""){
            window.alert("type in the search box")
        }else{
            setIsLoading(true)
            setTimeout(() => {
                if(search.text){
                    setSearch({...search, query: search.text, hasQuery: true})
                }else{
                    setSearch({...search, query: search.text, hasQuery: false})
                }

                // type in some code ot fetch data from the api
                
                setIsLoading(false)
            }, 1000);
        }
    }

    return (
        <>
            <Tab.Container defaultActiveKey="feed">
                <Row>
                    <Col sm={3}>
                        <div className="py-3">
                            <Form.Group className="d-flex">
                                <Form.Control placeholder="Search" type="text" onChange={e=>onChangeSearchBox(e)}></Form.Control>
                                <Button variant="dark" onClick={() => handleSearch()}>
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </Button>
                            </Form.Group>
                        </div>
                        
                        <Nav variant="pills" className="flex-column">
                            <Nav.Link eventKey="feed">Feed</Nav.Link>
                            <Nav.Link eventKey="category">Categories</Nav.Link>
                            <Nav.Item>
                                <small className="text-center w-100">Nodaq © 2021</small>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        {
                            isLoading === true?
                            (
                                <div className="text-center">
                                    <Spinner animation="border"></Spinner>
                                    <p>Loading..</p>
                                </div>
                            )
                            :
                            search.hasQuery === true?
                                (
                                    <>
                                        <p>n results found for "{search.query}" </p>
                                    </>
                                )
                                :
                                (
                                    <Tab.Content>
                                        <Tab.Pane eventKey="feed">
                                            feed
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="category">
                                            <Row>
                                                {communityCategories.map((category, i)=>{
                                                    return <Col key={`cc-${i}`} xs={6} sm={4} md={3}>
                                                        <Card className="my-3 h-100">
                                                            <Card.Body>
                                                                <h4 className="text-center">{category.name}</h4>
                                                                <p className="text-center"><small>46 related communities</small></p>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                    
                                                })}
                                            </Row>
                                            
                                        </Tab.Pane>
                                    </Tab.Content>
                                )
                            
                        }

                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default HomeFeed
