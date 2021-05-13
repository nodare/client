import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { 
    Container, 
    Breadcrumb,
    Row,
    Col,
    Jumbotron, 
    Card,
    Form,
    Spinner,
    Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ChangeLayoutButton from "components/shared/buttons/ChangeLayoutButtons";

import { getUsersCommunities, clearCommunityItems, createCommunity } from "util/redux/actions/community.actions";
import { CreateCommunityModal } from "components/shared/modals/CommunityModal";
import { fetchUsersCommunities } from "services/community.service";
import { communities as staticCommunities, accountId } from "static";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock } from "@fortawesome/free-solid-svg-icons";


function UserCommunityListPage(props) {
    const [createCommunityDialog, toggleCreateCommunityDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(true) // boolean
    const [search, setSearch] = useState({
        query: '',
        text: ''
    })
    // const [communities, setCommunities] = useState([])  // string
    const [posts, setPosts] = useState([]) // array
    const [layout, setLayout] = useState('cards')

    const createNewCommunity = (data) => {
        props.createCommunity(data)
        window.alert("community created")
        props.getUsersCommunities(accountId)
    }
    

    useEffect(()=>{
        props.getUsersCommunities(accountId)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
        return()=>{
            props.clearCommunityItems()
        }
    }, [])

    
    useEffect(() => {
        console.log("searching")
    }, [search.text])

    
        

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
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" value={search.text} placeholder="Search for a community" onChange={e => setSearch({...search, text: e.target.value})}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={() => toggleCreateCommunityDialog(!createCommunityDialog)}><FontAwesomeIcon icon={faPlus}/> New Community</Button>
                            </Col>
                        </Form.Row>
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
                                {props.communityItems.map((community, i)=>{
                                    switch(layout){
                                        case 'cards':
                                            return(
                                                <Col sm={6} md={4} xl={3} key={`com-${i}`}>
                                                    <LinkContainer to={`/square/${community.linear_id}`} style={{cursor: "pointer"}}>
                                                        <Card className="my-3">
                                                            <Card.Body>
                                                                <h4 className="text-center">{community?.title} {community?.isVisible === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</h4>
                                                                <p className="text-center">{community?.description}</p>
                                                                <p className="text-center"><small>Date created: {community?.created_at}</small></p>
                                                                {/* <small className="text-center">{community?.community_type === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</small> */}
                                                            </Card.Body>
                                                        </Card>
                                                    </LinkContainer>
                                                </Col>
                                            )
                                        case 'list':
                                            return(
                                                <Col xs={12} key={`com-${i}`}>
                                                    
                                                    <LinkContainer to={`/square/${community.linear_id}`} style={{cursor: "pointer"}}>
                                                        <Card className="px-3 py-2 my-2">
                                                            <div className="d-flex justify-content-between">
                                                                <div className="text-left">
                                                                    <h4>{community?.title} {community?.isVisible === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</h4>
                                                                    <span>{community?.description}</span>
                                                                </div>
                                                                <p><small>Date created: {community?.created_at}</small></p>
                                                                {/* <small className="text-center">{community?.community_type === 1?<FontAwesomeIcon icon={faLock}></FontAwesomeIcon>:""}</small> */}
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
            <CreateCommunityModal
                isShow={createCommunityDialog}
                toggleTrigger={() => toggleCreateCommunityDialog(false)}
                handleCreateCommunity={createNewCommunity}
            ></CreateCommunityModal>
        </>
    )
}

const mapStateToProps = state => ({
    communityItems: state.community.items
})

const mapDispatchToProps = {
    getUsersCommunities,
    createCommunity,    
    clearCommunityItems
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCommunityListPage)
