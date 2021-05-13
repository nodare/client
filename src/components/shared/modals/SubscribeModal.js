import React from 'react'
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";


export function SubscribeModal(props) {

    const subscribeMethod = () => {
        // place some code to set a timeout and add a condition to close the modal
        props.handleSubscribeButton()
        props.toggleTrigger(false)
    }

    return (
        <>
            <Modal show={props.isShow} onHide={()=>{props.toggleTrigger(false)}}>
                <Modal.Header><h4><strong>{props.header}</strong></h4></Modal.Header>
                <Modal.Body>
                    <p>{props.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-link" onClick={() => props.toggleTrigger(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => subscribeMethod()}>Subscribe</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

SubscribeModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    handleSubscribeButton: PropTypes.func.isRequired,
}