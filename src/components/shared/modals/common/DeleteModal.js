import React from 'react'
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

export default function DeleteModal(props) {

    const deleteMethod = () =>{
        // place some code to set a timeout and add a condition to close the modal
        props.handleDeleteButton()
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
                    <Button variant="danger" onClick={() => deleteMethod()}>{props.deleteButtonText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

DeleteModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    handleDeleteButton: PropTypes.func.isRequired,
    deleteButtonText: PropTypes.string.isRequired,
}
