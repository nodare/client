import React from 'react'
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
export default function BuyModal(props) {
    
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
                    <Button variant="outline-link" onClick={()=>props.toggleTrigger(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => buyMethod()}>Buy Item {`$${props.data.price}`}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

BuyModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    handleBuyButton: PropTypes.func.isRequired,
    data: PropTypes.object
}