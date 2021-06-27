import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { LinkContainer } from "react-router-bootstrap";
import { Tab, Nav, Row, Col, Form, Card, Spinner, Button, Image } from "react-bootstrap";
import { communityCategories } from "static";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { UiContext } from 'pages'

import { useLatestFeed } from 'util/helpers/hooks/feed.hooks'
import { useCommunityDetails } from 'util/helpers/hooks/community.hooks'

import FeedItemCard from 'components/shared/cards/FeedItemCards'

import { UserContextProvider } from 'pages/user/UserContextProvider'

function HomePage(props) {
    const ui = React.useContext(UiContext)
    const usertest = React.useContext(UserContextProvider)
    const feed = useLatestFeed()
    const [feedPosts, setFeedPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [followedCommunitiesList, setFollowedCommunitiesList] = useState(null)
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
        console.log(usertest)
        setSelectedPage('feed')
    }, [])

    useEffect(() => {
        props.getUsersFollowers(ui?.currentUser?.linear_id)
    }, [ui])

    useEffect(() => {
        setFollowedCommunitiesList(prevState=>props.followers)
    }, [props.followers, followedCommunitiesList])

    
    useEffect(() => {
        if(!feed.isLoading){
            setFeedPosts(feed.response)
        }
    }, [feed])

    return (
        <>
            <UserContextProvider>
                
            </UserContextProvider>
            <Tab.Container defaultActiveKey="feed">
                <Row>
                    <Col sm={3} className="position-sticky">
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
                                            {
                                                map(followedCommunitiesList, (fcommunity)=>{
                                                    return (
                                                        <FollowedCommunityItemComponent id={fcommunity.community_id}/>
                                                    )
                                                })
                                            }
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
                                                {
                                                    feedPosts &&  feedPosts.length === 0 ?"there are no new posts now":
                                                    <>
                                                        {
                                                            map(feedPosts, (post, i)=>{
                                                                if(feed.isLoading == false){
                                                                    return (
                                                                        <FeedItemCard 
                                                                            key={i} 
                                                                            post={post}
                                                                        />
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </>
                                                }
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

const FollowedCommunityItemComponent = ({id}) => {
    const { isLoading, error, response} = useCommunityDetails(id)
    const [community, setCommunity] = useState(null)
    
    useEffect(() => {
        !isLoading && setCommunity(response && response[0])
    }, [isLoading, error, response])
    

    return(
        <div className="d-flex justify-content-left py-1">
            <Image src={"https://placekitten.com/200/200"} roundedCircle style={{height:"40px"}} className={"mr-3"}/>
            <div className="d-block">
                <span><small>{community && community.title}</small></span>
            </div>
        </div>
    )
    
}

export { HomePage }
