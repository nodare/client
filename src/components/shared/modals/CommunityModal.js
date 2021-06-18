import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { UiContext } from 'pages'

export function CreateCommunityModal(props) {
    const ui = React.useContext(UiContext)
    const [communityNameInput, setCommunityNameInput] = useState("")
    const [communityDescriptionInput, setCommunityDescriptionInput] = useState("")
    const [communityType, setCommunityType] = useState(false)
    
    const createCommunity = () =>{
        if(communityNameInput === "") return window.alert("Write something in the community name")
        if(communityDescriptionInput === "") return window.alert("Write something in the community description")
        
        let data = {
            user_id: ui?.currentUser?.linear_id,
            title: communityNameInput,
            description: communityDescriptionInput,
            community_type: communityType,
            status: 0,
        }
        // place some code to set a timeout and add a condition to close the modal
        props.toggleTrigger(false)
        props.handleCreateCommunity(data)
        
        setCommunityNameInput("")
        setCommunityDescriptionInput("")
        setCommunityType(false)
    }

    
    return (
        <>
            <Modal show={props.isShow} onHide={() => props.toggleTrigger(false)}>
                <Modal.Header>
                    <h4>
                        <strong>
                            Create Community
                        </strong>
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Community Name</Form.Label>
                        <input type="text" className="form-control" maxLength={35} required onChange={(e) => setCommunityNameInput(e.target.value)} placeholder="e.g. Noodles"/>
                        <Form.Text>{communityNameInput.length} of 35</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <textarea type="text" className="form-control" maxLength={255} required onChange={(e) => setCommunityDescriptionInput(e.target.value)} placeholder="Write your description here.."></textarea>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            id="communityType"
                            type="switch"
                            label={communityType === false?'Public':'Private'}
                            onChange={e=>setCommunityType(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-link" onClick={()=>props.toggleTrigger(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => createCommunity()}>Create Community</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

CreateCommunityModal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    toggleTrigger: PropTypes.func.isRequired,
    handleCreateCommunity: PropTypes.func.isRequired,
}