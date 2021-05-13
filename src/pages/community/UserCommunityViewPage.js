import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { 
    Container,
    Card, 
    Dropdown,
    DropdownButton,
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
import { connect } from "react-redux";

import ChangeLayoutButtons from "components/shared/buttons/ChangeLayoutButtons";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { getCommunityData, clearCommunityData } from "util/redux/actions/community.actions";
import { getCommunityPosts, clearPosts } from "util/redux/actions/posts.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV} from "@fortawesome/free-solid-svg-icons";


function UserCommunityViewPage(props) {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [layout, setLayout] = useState('cards')
    const [communityData, setCommunityData] = useState()
    // const [posts, setPosts] = useState([])
    
    const getCommunityData = linearId => {
        props.getCommunityData(linearId).then(res=>{
            setCommunityData(res.data)
        })
    }
    
    useEffect(() => {
        setIsLoading(true)
        getCommunityData(params.community_id)
        props.getCommunityPosts(params.community_id)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return()=>{
            props.clearCommunityData()
            props.clearPosts()
        }
    }, [])

    return (
        <>
            <Container>

                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/square">
                        Communities
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Name of community</Breadcrumb.Item>
                </Breadcrumb>
                <Jumbotron>
                    <h2>{props.community.title}</h2>
                    <small>Date created: {(props.community.created_at)}</small>
                </Jumbotron>

                <Row>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Search post.. (e.g. Twinkies)"/>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <div className="text-right">
                            <LinkContainer to="/square/post/create">    
                                <Button variant="success"> <FontAwesomeIcon icon={faPlus} /> Create new post</Button>
                            </LinkContainer>
                            <ChangeLayoutButtons handleChangeLayout={setLayout}/>
                            <DropdownButton
                                as="ButtonGroup"
                                title={<FontAwesomeIcon icon={faEllipsisV}/>}
                                variant={"outline-secondary"} 
                                drop={'down'}
                            >
                                <LinkContainer to={`/square/${props.community.linear_id}/settings`}>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                </LinkContainer>
                            </DropdownButton>
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
                        props.posts.length === 0?
                            <p className="text-center">There are no posts to show. </p>
                        :
                            layout==='cards'?
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                                    <Masonry>
                                        {
                                            props.posts.map((post, i)=>{
                                                return(
                                                    <LinkContainer key={i} to={`/square/${params.community_id}/post/${post.linear_id}`}>
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
                                            props.posts.map((post, i)=>{
                                                return(
                                                    <LinkContainer to={`/square/${params.community_id}/post/${post.linear_id}`}>
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

const mapStateToProps = state => ({
    community: state.community.item,
    posts: state.posts.items
})

const mapDispatchToProps = {
    getCommunityData,
    getCommunityPosts,
    clearCommunityData,
    clearPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCommunityViewPage)
