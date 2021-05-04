import React from 'react'
import { Modal, Button } from "react-bootstrap";

/*
    Modal dictionary:
        isShow                      *value to toggle the modal
        toggleTrigger               *method to toggle the modal
        header                      *text to put in the header
        text                        *text to put in the body of the modal.
        handleSubscribeButton       *buy method
        *data                       *data passed to the modal        
        button{
            
        }
*/


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
