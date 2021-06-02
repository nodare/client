import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Tab, Nav, Row, Col, Form, Card, Spinner, Button, Image } from "react-bootstrap";
import { communityCategories } from "./../../static";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch
} from "@fortawesome/free-solid-svg-icons";

import { getAllCommunities, clearCommunityItems } from "util/redux/actions/community.actions";

function HomeFeed(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedPage, setSelectedPage] = useState("feed")
    const [search, setSearch] = useState({
        text: "",
        hasQuery: false,
        query: "",
        result: []
    })

    
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

    const selectPage = item => {
        if(props.communities.length > 0) props.clearCommunityItems()
        setSelectedPage(item)
        switch(item){
            case "feed":
                break;
            case "explore":
                props.getAllCommunities()
                break;
            case "category":
                break;
            default: 
                break;
        }
    }

    useEffect(() => {
        setSelectedPage('feed')
    }, [])

    

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
                            <Nav.Link onSelect={() => selectPage("feed")} eventKey="feed">Feed</Nav.Link>
                            <Nav.Link onSelect={() => selectPage("explore")} eventKey="explore">Explore</Nav.Link>
                            <Nav.Link onSelect={() => selectPage("category")} eventKey="category">Categories</Nav.Link>
                        </Nav>
                        <hr/>
                        <div className="d-block">
                            <small>Communities you follow</small>
                            <Row>
                                <Col sm={12}>
                                    <Card>
                                        <Card.Body>
                                            asdfasd
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <small className="text-center w-100">Nodaq © 2021</small>
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
                                    <>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="feed">
                                                Feed
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="explore">
                                                <span className="h3">Explore more communities</span>
                                                <Row className="my-2">
                                                    {props.communities.map((community, i)=>{
                                                        return(
                                                            <>
                                                                <Col xs={6} md={4} key={i}>
                                                                    <LinkContainer to={`/square/${community.linear_id}`}>
                                                                        <Card>
                                                                            <Card.Body>
                                                                                <Image src="http://placekitten.com/300/300" className="w-100"/>
                                                                                <strong>{community.title}</strong>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </LinkContainer>
                                                                </Col>
                                                            </>
                                                        )
                                                    })}
                                                </Row>
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
                                            <Tab.Pane eventKey="profile">
                                                Profile
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </>
                                )
                            
                        }

                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

const mapStateToProps = state => ({
    communities: state.community.items
})


const mapDispatchToProps = {
    getAllCommunities,
    clearCommunityItems
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeed)
