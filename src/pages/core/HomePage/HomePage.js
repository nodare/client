import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { LinkContainer } from "react-router-bootstrap";
import * as ta from "timeago.js";
import { Tab, Nav, Row, Col, Form, Spinner, Button,Jumbotron, InputGroup } from "react-bootstrap";
import { communityCategories } from "static";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch,FaRegKissWinkHeart,FaRegImages} from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { UiContext } from 'pages'
import {Feed,Card,Image,Icon } from 'semantic-ui-react'
import { useLatestFeed } from 'util/helpers/hooks/feed.hooks'
import { useCommunityDetails } from 'util/helpers/hooks/community.hooks'

import FeedItemCard from 'components/shared/cards/FeedItemCards'

import { UserContextProvider } from 'pages/user/UserContextProvider'
import 'semantic-ui-css/semantic.min.css'
function HomePage(props) {
    const ui = React.useContext(UiContext)
    //const usertest = React.useContext(UserContextProvider)
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
            case "community":
                props.getAllCommunities()
                break;
            case "blog":
                props.getAllBlogs()
                break;
            default: 
                break;  
        }
    }

    //useEffect(() => {
        //console.log(usertest)
        //setSelectedPage('feed')
    //}, [])

    useEffect(() => {
        console.log(ui)
        props.getUsersFollowers(ui.currentUser?.linear_id)
    }, [ui])

    useEffect(() => {
        setFollowedCommunitiesList(prevState=>props.followers)
    }, [props.followers, followedCommunitiesList])

    
    useEffect(() => {
        if(!feed.isLoading){
            setFeedPosts(feed.response)
        }
    }, [feed])
    console.log(navigator.languages)
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
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
                                    <FaSearch/>
                                </Button>
                            </Form.Group>
                        </div>
                        
                        <Nav variant="pills" className="flex-column">
                            <Nav.Link onSelect={() => selectPage("feed")} eventKey="feed">Feed</Nav.Link>
                            <Nav.Link onSelect={() => selectPage("community")} eventKey="community">Communities</Nav.Link>
                            <Nav.Link onSelect={() => selectPage("blog")} eventKey="blog">Blogs</Nav.Link>
                        </Nav>
                        <hr/>
                        <div className="d-block">
                            <small>Communities you follow</small>
                            <Row>
                                <Col sm={12}>
                                    <Card>
                                        <Card.Content>
                                            {
                                                map(followedCommunitiesList, (fcommunity)=>{
                                                    return (
                                                        <FollowedCommunityItemComponent id={fcommunity.community_id}/>
                                                    )
                                                })
                                            }
                                        </Card.Content>
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
                                                <Form>
                                                    <Form.Group>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <Button variant="primary">
                                                                <FaRegImages/>
                                                                </Button>
                                                                <Button variant="primary">
                                                                <FaRegKissWinkHeart/>
                                                                </Button>
                                                            </InputGroup.Prepend>
                                                            <Form.Control type="text" placeholder="Title" />
                                                            <InputGroup.Append>
                                                                <Button type="submit"><RiSendPlaneFill/></Button>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </Form.Group>
                                                    <Form.Group>
                                                    <Form.Control as="textarea" rows={3} />
                                                    </Form.Group>
                                                </Form>
                                                {
                                                    feedPosts &&  feedPosts.length === 0 ?"there are no new posts now":
                                                    <Feed>
                                                        {
                                                            map(feedPosts, (post, i)=>{
                                                                if(feed.isLoading == false && typeof(post)!=='undefined'){
                                                                    return (
                                                                        <FeedItemCard 
                                                                            key={i} 
                                                                            post={post}
                                                                        />
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </Feed>
                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="community">
                                                <Row className="my-2">
                                                    {props.communities.map((community, i)=>{
                                                        return(
                                                            <>
                                                                <Col xs={6} md={4} key={i}>
                                                                    <LinkContainer to={`/square/${community.linear_id}`}>
                                                                        <Card raised={true}>
                                                                            <Image src="http://placekitten.com/300/300" wrapped ui={false} />
                                                                            <Card.Content>
                                                                                <Card.Header className="h6">{community.title}</Card.Header>
                                                                                <Card.Meta>Since {ta.format(new Date(community.created_at))}</Card.Meta>
                                                                                <Card.Description>{community.description}</Card.Description>
                                                                            </Card.Content>
                                                                            <Card.Content extra>
                                                                            <a>
                                                                                <Icon name='user' />
                                                                                10 Members
                                                                            </a>
                                                                            </Card.Content>
                                                                        </Card>
                                                                    </LinkContainer>
                                                                </Col>
                                                            </>
                                                        )
                                                    })}
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="blog">
                                                <Row>
                                                {props.blogs?.map((blog, i)=>{
                                                        return(
                                                            <>
                                                                <Col xs={6} md={4} key={i}>
                                                                    <LinkContainer to={`/square/${blog.linear_id}`}>
                                                                        <Card raised={true}>
                                                                            <Image src="http://placekitten.com/300/300" wrapped ui={false} />
                                                                            <Card.Content>
                                                                                <Card.Header className="h6">{blog.title}</Card.Header>
                                                                                <Card.Meta>Since {ta.format(new Date(blog.created_at))}</Card.Meta>
                                                                                <Card.Description>{blog.description}</Card.Description>
                                                                            </Card.Content>
                                                                            <Card.Content extra>
                                                                            <a>
                                                                                <Icon name='user' />
                                                                                10 Members
                                                                            </a>
                                                                            </Card.Content>
                                                                        </Card>
                                                                    </LinkContainer>
                                                                </Col>
                                                            </>
                                                        )
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
            <Image src={"https://placekitten.com/200/200"} style={{height:"40px"}} className={"mr-3"}/>
            <div className="d-block">
                <span><small>{community && community.title}</small></span>
            </div>
        </div>
    )
    
}

export { HomePage }
