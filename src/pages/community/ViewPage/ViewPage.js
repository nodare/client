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
import { useCommunityDetails } from "util/helpers/hooks/community.hooks"
import PostCardItem from "components/common/posts/PostCardItem";
import PostListItem from "components/common/posts/PostListItem";
import FollowButton from 'components/shared/buttons/FollowButton'
import CreateCategoryModal from "components/shared/modals/CreateCategoryModal";
import { HotToast } from 'components/common/toasts/toast'
import ProfileComponent from 'components/common/users/ProfileItem';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV} from "@fortawesome/free-solid-svg-icons";

import { UiContext } from 'pages'

import { serverUrl } from 'static'
import upvotesReducers from 'util/redux/reducers/upvotes.reducers';
import { Alert } from 'bootstrap';
import { isUndefined } from 'lodash-es';
import { Segment,Icon} from 'semantic-ui-react';

function ViewPageComponent(props) {
    const params = useParams();
    const ui = React.useContext(UiContext)
    const history = useHistory()
    const {path, url} = useRouteMatch()
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowed, setIsFollowed] = useState(0)
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [layout, setLayout] = useState('list')
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [createCategoryModal, showCreateCategoryModal] = useState(false)
    const [posts, setPosts] = useState([])

    //const user = useActiveUserDetails(localStorage.getItem('token'))

    const getCommunityData = () => {
        if(params.addr){
            props.getCommunityData(params.addr)
            .then((res)=>{
            })
        }
    }

    const getFollowStatus = () =>{
        if(params.addr){
            if(ui?.currentUser?.linear_id){
                let data = {
                    user_id: ui?.currentUser?.linear_id,
                    addr: params.addr
                }
                props.getFollowStatus(data)
                .then((res)=>{
                    console.log(data)
                    if(res.payload==''){
                        setIsFollowed(0)
                    }else{
                        setIsFollowed(res.payload.status)
                    }
                })
            }
            
        }
    }

    const createCategory = data => {
        props.createCommunityCategory(data)
        .then(()=>{
            props.getCommunityCategories(params.addr)
            window.alert('category created')
        })
    }

    // to be continued lateer
    const selectCategory = (key, id = 0) => {
        console.log(key)
        console.log(id)
        if(params.addr){
            setSelectedCategory(key)
            setIsLoading(true)
            if(key===0){
                props.clearPosts()
                props.getCommunityPosts(params.addr)
                .then(()=>{
                    setIsLoading(false)
                })
            }else{
                props.clearPosts()
                setSelectedCategoryId(id)
                props.getCommunityPostsByCategory(params.addr, id)
                .then(()=>{
                setIsLoading(false)
                })
            }
        }
    }

    const toggleFollowCommunity = () => {
        if(ui?.currentUser?.linear_id){
            let data = {
                user_id: ui?.currentUser?.linear_id,
                addr: params.addr,
                status:isFollowed
            }

            props.followCommunity(data)
            .then(res=>{
                getFollowStatus()
                props.getCommunityFollowers(props?.community?.linear_id)
            })
        }
    }

    const verifyCreatePostNavigation = () => {
        if(props?.categories.length == 0){
            toast.error("You have to create a new category first before creating a post")
        }else{
            history.push('/square/post/create/'+params.addr+'/'+selectedCategoryId)
        }
    }
    
    useEffect(() => {
        getCommunityData()
        return()=>{
            props.clearCommunityData()
            props.clearPosts()
            props.clearFollow()
        }
    }, [params])
    

    useEffect(() => {
        if(params.addr){
            console.log(params.addr)
            props.getCommunityFollowers(params.addr).then(()=>{
                getFollowStatus()
            })
            props.getCommunityCategories(params.addr)
            .then(()=>{
                props.getCommunityPosts(params.addr)
                .then(()=>{
                    if(params?.category_id &&  props.categories.length > 0){
                        props.categories.map((category, i)=>{
                            if(category.linear_id === params.category_id){
                                selectCategory(i+1, category.linear_id)
                            }
                        })
                    }else{
                        selectCategory(0)
                    }
                    setIsLoading(false)
                })
            })
        }
    }, [params])
    return (
        <>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        Home
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
                                        backgroundImage: `url("${serverUrl}/images/community/covers/${params.addr}/${props.community.thumbnail_image}")`,
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
                                isFollowed>=3?
                                    <>
                                        <Button variant="outline-primary" block className="my-2" onClick={() => showCreateCategoryModal(true)}><FontAwesomeIcon icon={faPlus}/> Create new category</Button>
                                    </>
                                :""
                            }
                            
                            <Segment.Group raised>
                                        <ListGroup.Item active={selectedCategory === 0} className="d-block justify-content-between" onClick={()=>selectCategory(0,0)}  key={0}>
                                            <strong>#All</strong>
                                        </ListGroup.Item>
                                {
                                    props.categories.length > 0?
                                        props.categories.map((category, i)=>{
                                            return(
                                                <ListGroup.Item active={selectedCategory === i+1} className="d-block justify-content-between" onClick={()=>selectCategory(i+1, category.linear_id)} key={i+1}>
                                                    <strong>#{category.name}</strong>
                                                </ListGroup.Item>
                                            )
                                        })
                                    :""
                                }
                            </Segment.Group>
                        </div>
                        {/* end of categories list */}

                        <Card>
                            <Card.Header>
                                <strong>Members</strong>
                            </Card.Header>
                            <Card.Body className="py-2">
                                <>
                                    {/* create own independent component for user item  */}
                                    {
                                        props.followers?.map((follower, i)=>{
                                            console.log(follower.user_id)
                                            return(
                                                <>
                                                    <div className="d-flex justify-content-left py-1">
                                                        <Image src={"https://placekitten.com/200/200"} roundedCircle style={{height:"40px"}} className={"mr-3"}/>
                                                        <div className="d-block">
                                                            <span><strong><ProfileComponent userLinearId={follower.user_id}/></strong> {follower.user_id === ui?.currentUser?.linear_id?"(You)":""} </span>
                                                            <span className="d-block">{
                                                            follower.status===1||follower.status===2?"User":follower.status>=3?"Admin":""
                                                            }</span>
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
                                        props?.community?.type === 0?
                                        <>
                                            <ButtonGroup className="px-2">
                                                {isFollowed===2?
                                                <Button variant="warning" disabled> <FontAwesomeIcon icon={faPlus} /> You can't post</Button>
                                                :
                                                    isFollowed>=1?
                                                        <Button variant="success" onClick={() => verifyCreatePostNavigation()}> <FontAwesomeIcon icon={faPlus} /> Create new post</Button>
                                                    :
                                                    ""
                                                }
                                                <FollowButton isFollowed={isFollowed} isLoggedIn={ui?.isLoggedIn?true:false} handleFollow={() => toggleFollowCommunity()}/>
                                            </ButtonGroup>
                                        </>
                                        :
                                        <>
                                            <ButtonGroup className="px-2">
                                                {
                                                isFollowed>=3?
                                                <Button variant="success" onClick={() => verifyCreatePostNavigation()}> <FontAwesomeIcon icon={faPlus} /> Create new post</Button>
                                                :
                                                    isFollowed==4?
                                                    <FollowButton isFollowed={isFollowed} isLoggedIn={ui?.isLoggedIn?true:false} handleFollow={() => toggleFollowCommunity()}/>
                                                    :
                                                    ""
                                                }
                                            </ButtonGroup>
                                        </>
                                }
                                <Button><Icon name="heart outline"/></Button>
                                <ChangeLayoutButtons handleChangeLayout={setLayout}/>

                                <DropdownButton
                                    as={ButtonGroup}
                                    title={<FontAwesomeIcon icon={faEllipsisV}/>}
                                    variant={"outline-secondary"} 
                                    drop={'down'}
                                    >
                                            <>
                                                <LinkContainer to={`/square/${params.addr}/settings`}>
                                                    <Dropdown.Item>Settings</Dropdown.Item>
                                                </LinkContainer>
                                            </>
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
                                                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
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
