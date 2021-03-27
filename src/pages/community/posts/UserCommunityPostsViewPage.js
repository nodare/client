import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { ButtonGroup, Button, Container, Card, Form, Tabs, Tab, Table, Image } from "react-bootstrap";
import UserCommunityPostsCreatePage from './../posts/UserCommunityPostsCreatePage';
import { samplePost } from "./../../../static";

import UpvoteButton from "./../../../components/shared/buttons/UpvoteButton";


function UserCommunityPostsViewPage() {
    const [owner, setOwner] = useState(true)
    // static data for now
    const [post, setPost] = useState(samplePost)
    const [showCommentsBox, setShowCommentsBox] = useState(false)

    const onClickShowCommentsButton = () => {
        setShowCommentsBox(true)
    }
    
    return (
        <>
            <Container>
                
                <Tabs defaultActiveKey="post">
                    <Tab eventKey="post" title="post">
                        
                        <Card>
                            <Card.Body>

                                {/* main post */}
                                <>
                                    <span>Posted by: Lex</span><br/>
                                    <span>55 minutes ago</span>
                                    
                                    {samplePost.contents.map((content, i)=>{
                                        {
                                            switch(content.type){
                                                case "header":
                                                    switch(content.data.level){
                                                        case 1:
                                                            return(
                                                                <h1 key={i}>{content.data.text}</h1>
                                                            )
                                                        case 2:
                                                            return(
                                                                <h2 key={i}>{content.data.text}</h2>
                                                            )
                                                            break;
                                                        case 3:
                                                            return(
                                                                <h3 key={i}>{content.data.text}</h3>
                                                            )
                                                            break;
                                                        case 4:
                                                            return(
                                                                <h4 key={i}>{content.data.text}</h4>
                                                            )
                                                            break;
                                                        case 5:
                                                            return(
                                                                <h5 key={i}>{content.data.text}</h5>
                                                            )
                                                            break;
                                                        case 6:
                                                            return(
                                                                <h6 key={i}>{content.data.text}</h6>
                                                            )
                                                            break;
                                                    }
                                                    break;
                                                case "paragraph":
                                                    return(
                                                        <p key={i}>{content.data.text}</p>
                                                    )
                                                    break;
                                                case "link":
                                                    return(
                                                        <Link to={content.data.link}>Link</Link>
                                                    )
                                                    break;
                                                case "quote":
                                                    return(
                                                        // to be revised
                                                        <Card key={i}>
                                                            <Card.Body>
                                                                <div className="d-block">
                                                                    <p>{content.data.text}</p>
                                                                </div>
                                                                <small>{content.data.caption}</small>
                                                            </Card.Body>
                                                        </Card>
                                                    )
                                                    break;
                                                case "list":
                                                    switch(content.data.style){
                                                        case "ordered":
                                                            <ol>
                                                                {
                                                                    content.data.items.map((item,i)=>{
                                                                        <li key={i}>{item}</li>
                                                                    })
                                                                }
                                                            </ol>
                                                            break;
                                                        case "unordered":
                                                            <ul>
                                                                {
                                                                    content.data.items.map((item,i)=>{
                                                                        <li key={i}>{item}</li>
                                                                    })
                                                                }
                                                            </ul>
                                                            break;
                                                        default: 
                                                            break;
                                                    }
                                                    break;
                                                case "table":
                                                    <Table>
                                                        {
                                                            content.data.content.map((row, i)=>{
                                                                (
                                                                    <tr key={i}>
                                                                        {
                                                                            row.map((cell, j)=>{
                                                                                <td key={j}>
                                                                                    {cell}
                                                                                </td>
                                                                            })
                                                                        }
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </Table>
                                                    break;
                                                case "image":
                                                    // code placed sood
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    })}
                                </>
                                {/* end of main post */}

                                {/* post buttons */}
                                <ButtonGroup className="py-3">
                                    <UpvoteButton/>
                                    <Button size="sm" variant="primary" onClick={() => onClickShowCommentsButton(true)}>Comment</Button>
                                    <Button size="sm" variant="primary">Share</Button>
                                    <Button size="sm" variant="danger">Delete</Button>
                                    <Button size="sm" variant="danger">Report</Button>
                                </ButtonGroup>

                                <h4>Discussion (13)</h4>
                                <Form.Group className="d-flex justify-content-left">
                                    <textarea className="form-control" placeholder="Write a comment here"></textarea>
                                    <Button variant="primary">Send</Button>
                                </Form.Group>

                                {/* user comments */}
                                {showCommentsBox === false?
                                    (
                                        <div className="commentsSectionBox">
                                            <div className="d-flex justify-content-center py-3">
                                                <span onClick={()=>onClickShowCommentsButton()}>Click to show comments</span>
                                            </div>
                                        </div>
                                    )
                                :
                                    (
                                        <div className="commentsSectionBox">
                                            <div className="d-flex justify-content-left py-3">
                                                <Image 
                                                    src={"https://placekitten.com/100/100"}
                                                    style={{height:'50px'}}
                                                    className="my-1 px-2"
                                                    roundedCircle
                                                ></Image>
                                                <div id="commentsSectionBox">
                                                    <strong>Name of user</strong> <small>55 minutes ago</small>
                                                    <p>Back in that days, Noodra still ordinary ramen maker, when suddenly some black light hit one of the sack. The track who has been delivering several ramen shop. One of the shop who has some black aura on the sack.</p>
                                                    <div>

                                                        <ButtonGroup className="justify-content-right">
                                                            <UpvoteButton/>
                                                            <Button size="sm" variant="primary">Comment</Button>
                                                            <Button size="sm" variant="danger">Delete</Button>
                                                            <Button size="sm" variant="danger">Repsort</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-left py-3">
                                                <Image 
                                                    src={"https://placekitten.com/100/100"}
                                                    style={{height:'50px'}}
                                                    className="my-1 px-2"
                                                    roundedCircle
                                                ></Image>
                                                <div id="commentsSectionBox">
                                                    <strong>Name of user</strong> <small>55 minutes ago</small>
                                                    <p>Back in that days, Noodra still ordinary ramen maker, when suddenly some black light hit one of the sack. The track who has been delivering several ramen shop. One of the shop who has some black aura on the sack.</p>
                                                    <p>Then later, the chef of the ramen, making a ramen for his customer. &nbsp;He disgrace some customer who wasting the ramen while still hot. He got mad on the customer without appropriate. The customer fill the same feeling to the ramen maker being disgrace, so that he do. He abuse the ramen. This is the started of the creation of &nbsp;Noodra who has a goal to eliminated all the people who eat ramen and teach them that the way of the noodles.</p>
                                                    <div>

                                                        <ButtonGroup className="justify-content-right">
                                                            <UpvoteButton/>
                                                            <Button size="sm" variant="primary">Comment</Button>
                                                            <Button size="sm" variant="danger">Delete</Button>
                                                            <Button size="sm" variant="danger">Repsort</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </Card.Body>
                        </Card>

                    </Tab>


                    <Tab eventKey="settings" title="settings">
                        Settings page
                        
                        <Table
                            size={'sm'}
                            borderless
                            responsive
                        >
                            <tr>
                                <td><strong>Communities</strong></td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td><strong>Registered</strong></td>
                                <td>02/23/2020</td>
                            </tr>
                            <tr>
                                <td><strong>Last logged in:</strong></td>
                                <td>14 minutes ago</td>
                            </tr>
                        </Table>
                    </Tab>
                </Tabs>
                
            </Container>
        </>
    )
}

export default UserCommunityPostsViewPage
