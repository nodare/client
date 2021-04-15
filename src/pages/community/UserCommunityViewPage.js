import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { 
    Container,
    Card, 
    Image,
    Spinner,
    Breadcrumb,
    Jumbotron,
    Row,
    Col,
    Form,
    Button,
    ListGroup
} from "react-bootstrap";
import ChangeLayoutButtons from "./../../components/shared/buttons/ChangeLayoutButtons";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { fetchCommunityData, fetchCommunitiyPosts, fetchCommunityPosts } from "./../../services/community.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { postsList } from "./../../static";

function UserCommunityViewPage() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [layout, setLayout] = useState('cards')
    const [communityData, setCommunityData] = useState()
    const [posts, setPosts] = useState([])
    
    const getCommunityData = linearId => {
        fetchCommunityData(linearId).then(res=>{
            setCommunityData(res.data)
        })
        console.log(communityData)
    }
    const fetchPosts = (linearId) => {
        fetchCommunityPosts(linearId)
        .then(res=>{
            console.log(res)
            setPosts(res)
        })
        // setPosts(postsList)
    }
    
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            getCommunityData(params.community_id)
            fetchPosts(params.community_id)
            setIsLoading(false)
        }, 1000);
    }, [])

    return (
        <>
            <Container>

                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/community">
                        Communities
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Name of community</Breadcrumb.Item>
                </Breadcrumb>
                <Jumbotron>
                    <h2>Name of community</h2>
                </Jumbotron>

                <Row>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Search post.. (e.g. Twinkies)"/>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <div className="text-right">
                            <ChangeLayoutButtons handleChangeLayout={setLayout}/>
                            {/* <ButtonGroup>
                                <Button variant={"outline-secondary"}><FontAwesomeIcon onClick={setLayout} icon={faThLarge}/></Button>
                                <Button variant={"outline-secondary"}><FontAwesomeIcon onClick={setLayout} icon={faList}/></Button>
                            </ButtonGroup> */}
                            
                            <LinkContainer to="/community/post/create">    
                                <Button variant="success"> <FontAwesomeIcon icon={faPlus} /> Create new post</Button>
                            </LinkContainer>
                        </div>
                    </Col>
                </Row>
                {/* <UserCommunityListPage/> */}

                {
                    isLoading === true?(
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="dark"></Spinner>
                        </div>
                    ):(
                    
                        /* communities */
                        posts.length === 0?
                            <p className="text-center">There are no posts to show. </p>
                        :
                            layout==='cards'?
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                                    <Masonry>
                                        {
                                            posts.map((post, i)=>{
                                                return(
                                                    <LinkContainer to={`/community/${params.community_id}/post/${post.linear_id}`}>
                                                        <Card className="p-3 mb-2 mx-1">
                                                            <Image src="https://placekitten.com/200/250" fluid></Image>
                                                            <div className="text-center py-2">
                                                                <h5>
                                                                    {post.title.substr(0,25)}
                                                                </h5>
                                                            </div>
                                                        </Card>
                                                    </LinkContainer>

                                                )
                                            })
                                        }
                                    </Masonry>
                                </ResponsiveMasonry>
                            :'list'?
                                layout==='list'?
                                    <ListGroup as="ul">
                                        {
                                            posts.map((post, i)=>{
                                                return(
                                                    <LinkContainer to={`/community/${params.community_id}/post/${post.linear_id}`}>
                                                        <ListGroup.Item as="li" style={{cursor: "pointer"}}>
                                                            <div className="d-flex justify-content-between">
                                                                    <p>{post.title.substr(0,25)}</p>
                                                                <p class="text-left"><small>Date Created: </small>{post.dateCreated}</p>
                                                            </div>
                                                        </ListGroup.Item>
                                                    </LinkContainer>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                :""
                            :""

                    )
                }

                
            </Container>
        </>
    )
}

export default UserCommunityViewPage
