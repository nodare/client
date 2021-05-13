import React from 'react'
import PropTypes from "prop-types";
import { Image, Card } from "react-bootstrap";

function UserConversationItem(props) {
    return (
        <>
            <Card className={props.isSelected?"bg-light":""}>
                <div className="d-flex">
                    <Image 
                        src={props.image}
                        style={{height:'50px'}}
                        className="my-1 px-2"
                        roundedCircle
                    ></Image>
                    <div className="d-block justify-content-left">
                        <strong>{props.name}</strong>
                        <p>{props.message.substr(0,10)}...</p>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default UserConversationItem

UserConversationItem.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    message: PropTypes.string,
    isSelected: PropTypes.string
}