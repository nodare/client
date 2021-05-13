import React, { useState, useEffect } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card,
    Image,
    ButtonGroup,
    Button,
    Form,
    Spinner
} from "react-bootstrap";
import BuyModal from "components/shared/modals/BuyModal";
import { sampleProduct } from "static";

function StoreMerchandiseItemPage() {
const [isLoading, setIsLoading] = useState(false)
const [productData, setProductData] = useState('')
const [buyModal, showBuyModal] = useState(false)

useEffect(() => {
    fetchPostData()
}, [])


const toggleBuyModal = (modalState=null) =>{
    showBuyModal(modalState || !buyModal)
}

const fetchPostData = () => {
    setIsLoading(true)
    setTimeout(() => {
        setProductData(sampleProduct)
        setIsLoading(false)
    }, 1000);
}

const buyItem = () =>{
    console.log("buying item")
}

    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={5}>
                        <Card>
                            <Card.Body>
                                {isLoading?
                                    <>
                                        <div className="text-center h-100">
                                            <div className="d-block">

                                                <Spinner animation="grow"></Spinner>
                                            </div>
                                            <span>Loading image..</span>
                                        </div>
                                    </>
                                :
                                    <Image src={productData.image} className="w-100"></Image>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={7}>

                        {isLoading?
                            <>
                                <div className="text-center h-100">
                                <div className="d-block">
                                    <Spinner animation="border"></Spinner>
                                    </div>
                                    <span>Loading content..</span>
                                </div>
                            </>
                        :
                            <>
                                <h3>{productData.productName}</h3>
                                <span className="text-info">{productData.rating} out of 5</span>
                                <p>{productData.description}</p>
                                <ButtonGroup>
                                    <Button variant="primary" onClick={()=>toggleBuyModal()}>Buy Now ${productData.price}</Button>
                                </ButtonGroup>

                            </>
                        }

                        
                    </Col>
                </Row>
            </Container>
            <BuyModal
                isShow={buyModal}
                toggleTrigger={toggleBuyModal}
                header={"Confirm Subscription"}
                text={"Are you sure yo want to buy this item?"}
                handleBuyButton={buyItem}
                data={productData}
            />
        </>
    )
}

export default StoreMerchandiseItemPage
