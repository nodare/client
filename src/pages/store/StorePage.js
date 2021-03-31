import React, { useState, useEffect } from 'react'
import { Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { Tabs, Tab, Jumbotron, Row, Col, Card, Button, Image } from "react-bootstrap";
import StickerShopCard from "./../../components/shared/cards/StickerShopCard";
import { stickerShop } from "./../../static";

function MainStorePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [stickersList, setStickersList] = useState(stickerShop)

    // const fetchStickers = () => {
    //     // code to get stickers from api
    //     setStickersList(stickerShop)
    // }

    // useEffect(() => {
    //     fetchStickers()
    // }, [])

    return (
        <>

            <Tabs defaultActiveKey="subscriptions">

                <Tab eventKey="subscriptions" title="Subscriptions">
                    <div className="my-2">
                        <Jumbotron>
                            <h2>Subscriptions</h2>
                        </Jumbotron>
                        <Row>
                            <Col xs={12} xl={4} className="text-center py-1">
                                <Card>
                                    <Card.Body>
                                        <p><strong>Basic</strong></p>
                                        <h3>Free</h3>
                                        <p>Lorem ipsum dolor sit amet adipiscing </p>
                                        <ul>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                        </ul>
                                        <Button block variant={"primary"}>Subscribe</Button>
                                        <Button block variant={"link"}>View more</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} xl={4} className="text-center py-1">
                                <Card>
                                    <Card.Body>
                                        <p><strong>Standard</strong></p>
                                        <h3>$25</h3>
                                        <p>Lorem ipsum dolor sit amet adipiscing </p>
                                        <ul>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                        </ul>
                                        <Button block variant={"primary"}>Subscribe</Button>
                                        <Button block variant={"link"}>View more</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} xl={4} className="text-center py-1">
                                <Card>
                                    <Card.Body>
                                        <p><strong>Premium</strong></p>
                                        <h3>$150</h3>
                                        <p>Lorem ipsum dolor sit amet adipiscing </p>
                                        <ul>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                            <li>sadasdfasdf</li>
                                        </ul>
                                        <Button block variant={"primary"}>Subscribe</Button>
                                        <Button block variant={"link"}>View more</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        
                    </div>
                </Tab>

                <Tab eventKey="emoticons" title="Emoticons">
                    <div className="my-2">
                        <Jumbotron>
                            <h2>Emoticons</h2>
                        </Jumbotron>
                        <Row>
                            {
                                stickersList.map((sticker, i)=>{
                                    return(
                                        <Col key={i} xs={6} md={3}>
                                            <StickerShopCard 
                                                data={{
                                                    image: sticker.image,
                                                    title: sticker.title.substr(0,25),
                                                    author: sticker.author,
                                                    price: sticker.price
                                                }}
                                            ></StickerShopCard>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Tab>

                <Tab eventKey="merchandises" title="Merchandices">
                    <div className="my-2">
                        <Jumbotron>
                            <h2>Merchandises</h2>
                        </Jumbotron>
                        <Row>
                            <Col xs={6} md={4}>
                                <Card className="my-2">
                                    <Card.Body>
                                        <div className="d-block w-100">
                                            <Image src="assets/placeholders/tshirt-placeholder-1.jpg" className="w-100 pb-4"></Image> 
                                            <h4 className="text-center m-0 p-0"><strong>Title of the tshirt</strong></h4>
                                            <h5 className="text-center my-2 p-0 text-primary"><strong>$23.50</strong></h5>
                                            <LinkContainer to="/store/merchandise/333">
                                                <Button variant="primary" className="btn-block">View more</Button>
                                            </LinkContainer>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={6} md={4}>
                                <Card className="my-2">
                                    <Card.Body>
                                        <div className="d-block w-100">
                                            <Image src="assets/placeholders/tshirt-placeholder-2.jpg" className="w-100 pb-4"></Image> 
                                            <h4 className="text-center m-0 p-0"><strong>Title of the tshirt</strong></h4>
                                            <h5 className="text-center my-2 p-0 text-primary"><strong>$23.50</strong></h5>
                                            <LinkContainer to="/store/merchandise/333">
                                                <Button variant="primary" className="btn-block">View more</Button>
                                            </LinkContainer>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Tab>

            </Tabs>

        </>
    )
}

export default MainStorePage
