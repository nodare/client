/* 
    This is the very index component of Nodaq's messenger.
    Any connected components and state are stored here. 
*/

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Modal, Button, Col, Row, Form, Image } from "react-bootstrap";

import { 
    getUserConversations,
    getConversationUsers,
    getConversationMessages,
    getConversationData,
    addConversation,
    addConversationUsers,
    addMessage,
    clearConversations,
    clearConversationData,
    clearMessages
} from "util/redux/actions/messages.actions";

import UserConversationItem from "./sub-components/UserConversationItem";
import UserMessageItem from "./sub-components/UserMessageItem";

import { accountId } from "static";


function MessagingWindow(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [isCreateConversation, setIsCreateConversation] = useState(false)
    const [newUsers, setNewUsers] = useState([])
    
    const [messageInput, setMessageInput] = useState("")


    const loadConversations = () => {
        props.getUserConversations(accountId)
    }
    
    const handleCreateConversation = async (id) => {
        await setNewUsers([accountId, id])
        let newConversationData = {
            user_id: accountId
        }
        await props.addConversation(newConversationData)
        .then(()=>{
            props.getUserConversations(accountId)
        })

        // await setTimeout(() => {
        //     newUsers.map(user=>{
        //         console.log('adding user')
        //         props.addConversationUsers({
        //             conversation_id: props.messenger.conversationData.linear_id,
        //             user_id: user
        //         })
        //     })
        // }, 1000);
        setIsCreateConversation(false)

    }

    const handleSelectConversation = (conversationLinearId) => {
        setIsMessagesLoading(true)
        setTimeout(() => {
            props.getConversationData(conversationLinearId)
            .then(()=>{
                setIsMessagesLoading(false)
                props.getConversationMessages(conversationLinearId)
            })
        }, 1000);
    }
    
    const handleSendMessage = () => {
        let newMessageData = {
            user_id: accountId,
            content: messageInput
        }
        props.addMessage(newMessageData)
        .then(()=>{
            props.getConversationMessages(props.messenger.conversationData.linearId)
            setMessageInput("")
        })

    }

    useEffect(() => {
        if(props.isOpen){
            loadConversations()
        }
    }, [props.isOpen])

    return (
        <>
            <Modal {...props} show={props.isOpen} size="xl" autoFocus style={{height: '100%'}}>
                <Modal.Header closeButton>
                    <h4>Messenger</h4>
                </Modal.Header>
                <Modal.Body scrollable={"true"}>

                    {isLoading?
                        <div className="mx-auto text-center">
                            Loading..
                        </div>
                    :
                        <>
                            <Row>
                                {/* list of users */}
                                <Col xs={1} md={3}>
                                    <Button variant="outline-secondary" block className="mb-2" onClick={() => setIsCreateConversation(!isCreateConversation)}>
                                        {isCreateConversation?"Cancel":"New Message"}
                                    </Button>
                                    <Row>
                                        {
                                            isCreateConversation?
                                            <>
                                                <div className="d-flex">
                                                    {/* static data */}
                                                    <div className="d-block" onClick={()=>handleCreateConversation("98544686-b8e3-4db5-bae4-301a26a8e867")}>Manager</div>
                                                    <div className="d-block" onClick={()=>handleCreateConversation("c0085c57-c2dc-4fb0-b4a1-cd85cc38405d")}>Assistant manager</div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                {
                                                    props.messenger.conversations.length === 0?
                                                        <>
                                                            You have no conversations as of now
                                                        </>
                                                    :
                                                        <>
                                                            {props.messenger.conversations.map((conversation,i)=>{
                                                                return(
                                                                    <Col key={i} xs={12} className="d-flex" onClick={() => handleSelectConversation(conversation.linear_id)}>
                                                                        <UserConversationItem
                                                                            name={conversation.title || "New conversation"}
                                                                            image={"https://placekitten.com/100/100"}
                                                                            message={"test mesasge 1"}
                                                                            
                                                                        />
                                                                        <hr/>
                                                                    </Col>
                                                                )
                                                            })}
                                                        </>
                                                }
                                            </>
                                        }
                                    </Row>
                                </Col>
                                    

                                {/* messages here */}
                                <Col xs={1} md={9}>
                                    {
                                        isMessagesLoading?
                                            <div className="mx-auto text-center">
                                                Loading..
                                            </div>
                                        :
                                            props.messenger.messages.length === 0?
                                                <>
                                                    There are no messages to show. Type a new message
                                                </>
                                            :
                                            <>
                                                <div className="d-block">
                                                    {
                                                        props.messenger.messages.map((message,i)=>{
                                                            return(
                                                                <UserMessageItem
                                                                key={i}
                                                                    toggleReceiver={true}
                                                                    message={message.content}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        
                                    }
                                    
                                </Col>

                            </Row>
                        </>
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    <Form.Group>
                        <input type="text" name="messageInput" id="messageInput" className="form-control" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Write your message here.."/>
                    </Form.Group>
                    <Button variant={"outline-secondary"} onClick={() => handleSendMessage()}>Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    messenger: state.messages
})

const mapDispatchToProps = {
    getUserConversations,
    getConversationUsers,
    getConversationMessages,
    getConversationData,
    addConversation,
    addConversationUsers,
    addMessage,
    clearConversations,
    clearConversationData,
    clearMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagingWindow)