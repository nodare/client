/* 
    This modal is intended to be placed exclusively on the community 
    category list. 
*/

import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import { accountId } from "static";

function CreateCategoryModal(props) {
    
    const [categoryName, setCategoryName] = useState("")
    const [hasInputError, setHasInputError] = useState(true)
    const [categoryNameInputError, setCategoryNameInputError] = useState("")
    
    const handleCategoryNameInputchange = value => {
        setCategoryName(value)
        if(value === ""){
            setCategoryNameInputError("Field is empty")
            setHasInputError(true)
            return
        }

        if(value.length > 32){
            setCategoryNameInputError("Name cannot be more than 32 letters")
            setHasInputError(true)
            return
        }
        setHasInputError(false)
        
    }
    
    const createCategoryMethod = () => {
        let data = {
            user_id: accountId,
            community_id: props.community.linear_id,
            name: categoryName
        }
        props.handleCreateCategoryButton(data)
        closeModal()
    }

    const closeModal = () => {
        props.toggleTrigger(false)
        setCategoryName("")
        setHasInputError(true)
        setCategoryNameInputError("")
    }
    
    
    return (
        <>
            <Modal show={props.isShow}>
                <Modal.Header>
                    {props.header}
                </Modal.Header>
                <Modal.Body>
                    {props.text}
                    <Form.Group>
                        <InputGroup hasValidation>
                            <Form.Control type="text" value={categoryName} onChange={e=>handleCategoryNameInputchange(e.target.value)} autoFocus placeholder={"Enter your category name."} required isInvalid={hasInputError}/>
                            <Form.Control.Feedback type="invalid">{categoryNameInputError}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>closeModal()}>Cancel</Button>
                    <Button variant="primary" onClick={()=>createCategoryMethod()} disabled={hasInputError}>Create Category</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateCategoryModal

CreateCategoryModal.propTypes = {isShow: PropTypes.bool.isRequired,
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    handleCreateCategoryButton: PropTypes. func.isRequired,
    community: PropTypes.object.isRequired
}
