import React from 'react'
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

export default function InfoModal(props) {

    const handleConfirmMethod = () =>{
        // place some code to set a timeout and add a condition to close the modal
        props.handleConfirmModal()
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
                    <Button variant="danger" onClick={() => handleConfirmMethod()}>{props.confirmButtonText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

InfoModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    handleConfirmModal: PropTypes.func.isRequired,
    confirmButtonText: PropTypes.string.isRequired,
}
