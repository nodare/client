import React from 'react'
import { Card, Image } from "react-bootstrap";

function StickerShopCard(props) {
    /*
        data: { 
            isLoading
            title
            author
            image
        }
    */
    return (
        <>
            <Card className="my-2">
                <Card.Body>
                    <div className="d-block w-100">
                        <Image src={props.data.image} className="w-100" draggable={false}></Image>
                        <h5 className="text-center m-0 p-0 text-primary"><strong>${props.data.price}</strong></h5>
                        <h4 className="text-center m-0 p-0"><strong>{props.data.title}</strong></h4>
                        <p className="text-center m-0 p-0">
                            <><em>{props.data.author}</em></>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default StickerShopCard
