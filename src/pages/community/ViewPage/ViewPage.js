import React, { useState, useEffect } from 'react';
import { Route, useHistory } from "react-router";
import { useParams, useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { 
    ButtonGroup,
    Container,
    Card, 
    Dropdown,
    DropdownButton,
    Image,
    Spinner,
    Jumbotron,
    Breadcrumb,
    Row,
    Col,
    Form,
    Button,
    ListGroup
} from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast'

import ChangeLayoutButtons from "components/shared/buttons/ChangeLayoutButtons";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useActiveUserDetails } from "util/helpers/hooks/user.hooks";

import PostCardItem from "components/common/posts/PostCardItem";
import PostListItem from "components/common/posts/PostListItem";
import FollowButton from 'components/shared/buttons/FollowButton'
import CreateCategoryModal from "components/shared/modals/CreateCategoryModal";
import { HotToast } from 'components/common/toasts/toast'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV} from "@fortawesome/free-solid-svg-icons";

import { UiContext } from 'pages'

import { serverUrl } from 'static'

function ViewPageComponent(props) {
    const params = useParams();
    const ui = React.useContext(UiContext)
    const history = useHistory()
    const {path, url} = useRouteMatch()
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowed, setIsFollowed] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [layout, setLayout] = useState('list')
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [createCategoryModal, showCreateCategoryModal] = useState(false)
    const [posts, setPosts] = useState([])

    const user = useActiveUserDetails(localStorage.getItem('token')).response
    
    const getCommunityData = linearId => {
        props.getCommunityData(linearId)
        .then(()=>{
            props.getCommunityFollowers(params.community_id)
        })
    }

    const getFollowedCommunities = linearId => {
        props.getCommunityFollowers(linearId)
    }
    
    const createCategory = data => {
        props.createCommunityCategory(data)
        .then(()=>{
            props.getCommunityCategories(params.community_id)
            window.alert('category created')
        })
    }

    // to be continued lateer
    const selectCategory = (key, id = 0) => {
        if(key === selectedCategory) return
        setSelectedCategory(key)
        setIsLoading(true)
        props.getCommunityPostsByCategory(params.community_id, id)
        .then(()=>{
            setIsLoading(false)
        })
    }

    const toggleFollowCommunity = () => {
        let data = {
            user_id: ui.currentUser.linear_id,
            community_id: props.community.linear_id,
        }

        props.followCommunity(data)
        .then((res)=>{
            setIsFollowed(prevState => !prevState)
            props.getCommunityFollowers(props?.community?.linear_id)
        })
    }

    const verifyCreatePostNavigation = () => {
        if(props?.categories.length == 0){
            toast.error("You have to create a new category first before creating a post")
        }else{
            history.push('/square/post/create')
        }
    }
    
    useEffect(() => {
        getCommunityData(params.community_id)
        getFollowedCommunities(params.community_id)
        // props.getCommunityPosts(params.community_id)
        props.getCommunityCategories(params.community_id)
        .then(()=>{
            props.getCommunityPostsByCategory(params.community_id, 0)
            .then(()=>{
                if(props.posts){
                    selectCategory(0)
                    setIsLoading(false)
                }
            })
        })
        return()=>{
            props.clearCommunityData()
            props.clearPosts()
            props.clearFollow()
        }
    }, [])
    
    useEffect(() => {
        
        props?.community?.followers?.map((follower)=>{
            if(ui && ui?.currentUser?.linear_id === follower?.user_id){
                setIsFollowed(follower?.isFollowed === 1 ? true : false)
            }
        })
    }, [ui])

    useEffect(() => {
        selectCategory(0)
    }, [props.post])
    
    return (
        <>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/square">
                        Communities
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.community.title}</Breadcrumb.Item>
                </Breadcrumb>
                <HotToast />
                {
                    props?.community?.thumbnail_image ? 
                        <>
                            <Jumbotron 
                                style={
                                    {
                                        backgroundImage: `url("${serverUrl}/images/community/covers/${params.community_id}/${props.community.thumbnail_image}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundBlendMode: 'overlay'
                                    }
                                }
                            >
                                <span >
                                    <p><span className="h3">{props.community.title}</span> {props.community.description}</p>
                                </span>
                            </Jumbotron>
                        </>
                    :
                        <>
                            <span>
                                <p><span className="h3">{props.community.title}</span> {props.community.description}</p>
                            </span>
                        </>
                }
                <Row>
                    <Col xs={12} md={3}>
                        

                        {/* categories list */}
                        <div className="my-2">
                            {
                                props?.community?.user_id === ui?.currentUser?.linear_id ? 
                                    <>
                                        <Button variant="outline-primary" block className="my-2" onClick={() => showCreateCategoryModal(true)}><FontAwesomeIcon icon={faPlus}/> Create new category</Button>
                                    </>
                                :""
                            }
                            
                            <ListGroup>
                                {
                                    props.categories.length > 0?
                                        props.categories.map((category, i)=>{
                                            return(
                                                <ListGroup.Item active={selectedCategory === i+1} className="d-block justify-content-between" onClick={()=>selectCategory(i+1, category.linear_id)} key={i}>
                                                    <strong>#{category.name}</strong>
                                                </ListGroup.Item>
                                            )
                                        })
                                    :""
                                }
                            </ListGroup>
                        </div>
                        {/* end of categories list */}

                        <Card>
                            <Card.Header>
                                <strong>Members</strong>
                            </Card.Header>
                            <Card.Body className="py-2">
                                <>
                                    {/* create own independent component for user item  */}
                                    <div className="d-flex justify-content-left py-1">
                                        <Image src="https://placekitten.com/200/200" roundedCircle style={{height:"40px"}} className="mr-3"/>
                                        <div className="d-block">
                                            <span><strong>{user?.username}</strong> {props.community?.user_id === user?.linear_id?"(You)":""} </span>
                                            <span className="d-block">Owner</span>
                                        </div>
                                    </div>
                                    {
                                        props?.community?.followers?.map((follower, i)=>{
                                            return(
                                                <>
                                                    <div className="d-flex justify-content-left py-1">
                                                        <Image src={"https://placekitten.com/200/200"} roundedCircle style={{height:"40px"}} className={"mr-3"}/>
                                                        <div className="d-block">
                                                            <span><strong>{user?.username}</strong> {props.community?.user_id === user?.linear_id?"(You)":""} </span>
                                                            <span className="d-block">Owner</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                
                            </Card.Body>
                        </Card>
                        
                    </Col>
                    <Col xs={12} md={9}>
                        
                            <div className="text-right my-3">
                                
                                <Form.Group as={ButtonGroup} className="m-0">
                                    <Form.Control type="text" placeholder="Search for a post"/>
                                </Form.Group>
                                {
                                    props?.community?.user_id === ui?.currentUser?.linear_id?
                                        <>
                                            <Button variant="success" onClick={() => verifyCreatePostNavigation()}> <FontAwesomeIcon icon={faPlus} /> Create new post</Button>
                                        </>
                                    :
                                        <>
                                            <ButtonGroup className="px-2">
                                                <FollowButton isFollowed={isFollowed} handleFollow={() => toggleFollowCommunity()}/>
                                            </ButtonGroup>
                                        </>
                                }
                                <ChangeLayoutButtons handleChangeLayout={setLayout}/>

                                <DropdownButton
                                    as={ButtonGroup}
                                    title={<FontAwesomeIcon icon={faEllipsisV}/>}
                                    variant={"outline-secondary"} 
                                    drop={'down'}
                                    >
                                    {
                                        props?.community?.user_id === ui?.currentUser?.linear_id?
                                            <>
                                                <LinkContainer to={`/square/${props.community.linear_id}/settings`}>
                                                    <Dropdown.Item>Settings</Dropdown.Item>
                                                </LinkContainer>
                                            </>
                                        :""
                                    }
                                </DropdownButton>
                            </div>

                        {
                            isLoading === true?(
                                <div className="text-center py-5">
                                    <Spinner animation="border" variant="dark"></Spinner>
                                </div>
                            ):(
                                <>

                                        <Route exact path={`${path}`}>
                                            {
                                                /* communities */
                                                props?.posts?.length === 0?
                                                    <p className="text-center">There are no posts to show. </p>
                                                :
                                                    <>
                                                        {
                                                            layout==='cards'?
                                                                <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 2, 900: 4}}>
                                                                    <Masonry>
                                                                        {
                                                                            props.posts.map((post, i)=>{
                                                                                return(
                                                                                    <PostCardItem key={i} post={post}/>
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
                                                                                    <PostListItem key={i} post={post}/>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ListGroup>
                                                                :""
                                                            :""
                                                        }
                                                    </>
                                            }                                    
                                        </Route>
                                        
                                </>

                            )
                        }
                    </Col>
                </Row>
                
            </Container>
            <CreateCategoryModal
                isShow={createCategoryModal}
                community={props.community}
                toggleTrigger={showCreateCategoryModal}
                header={"Create Category"}
                text={"What would you like to name your new category?"}
                handleCreateCategoryButton={createCategory}
            />
        </>
    )
}

export { ViewPageComponent }
