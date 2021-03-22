import React, { useState, useEffect } from 'react'
import { Link } from "react-router";
import { Tabs, Tab, Jumbotron, Row, Col, Card, Button } from "react-bootstrap";
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
                            <h2>Merchandices</h2>
                        </Jumbotron>
                    </div>
                </Tab>

            </Tabs>

        </>
    )
}

export default MainStorePage
