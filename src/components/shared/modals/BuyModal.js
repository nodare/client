import React from 'react'
import { Modal, Button } from "react-bootstrap";

/*
    Modal dictionary:
        isShow          *value to toggle the modal
        toggleTrigger   *method to toggle the modal
        header          *text to put in the header
        text            *text to put in the body of the modal.
        handleBuyButton *buy method
        *data           *data passed to the modal        
        button{
            
        }
*/

export function BuyModal(props) {
    
    const buyMethod = () =>{
        // place some code to set a timeout and add a condition to close the modal
        props.handleBuyButton()
        props.toggleTrigger(false)
    }
    
    return (
        <>
            <Modal show={props.isShow} onHide={() => props.toggleTrigger(false)}>
                <Modal.Header>
                    <h4>
                        <strong>
                            {props.header}
                        </strong>
                    </h4>
                </Modal.Header>
                <Modal.Body>{props.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>props.toggleTrigger(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => buyMethod()}>Buy Item {`$${props.data.price}`}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export function BuyConfirmationModal(props){
    return(null)
}
