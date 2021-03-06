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
import {
    getContactList
} from "util/redux/actions/users.actions";
import toast from 'react-hot-toast'
import UserConversationItem from "./sub-components/UserConversationItem";
import UserMessageItem from "./sub-components/UserMessageItem";

import { accountId } from "static";


function MessagingWindow(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [isCreateConversation, setIsCreateConversation] = useState(false)
    const [newUsers, setNewUsers] = useState([])
    const [isContacts, setIsContacts] = useState(false)
    const [messageInput, setMessageInput] = useState("")


    const loadConversations = () => {
        props.getUserConversations(accountId)
    }
    const loadContacts = () => {
        props.getContactList(accountId)
    }
    const handleCreateConversation = async (id) => {
        let duplicationCheckData = {
            user_id:accountId,
            target_id:id
        }
        await props.duplicationCheck(duplicationCheckData)
        .then((res)=>{
            if(res.data.status==1){
                handleSelectConversation(res.data.linear_id)
            }else{
                let newConversationData = {
                    type:1,
                    status:1,
                }
               props.addConversation(newConversationData)
                .then((res)=>{
                    if(res.status=200){
                        const users = [{
                            conversation_id:res.data,
                            user_id: accountId
                        },
                        {
                            conversation_id:res.data,
                            user_id: id
                        }]
                        users.map(user=>{
                            props.addConversationUsers({
                                conversation_id: user.conversation_id,
                                user_id: user.user_id
                            })
                        })
                        let newMessageData = {
                            user_id: accountId,
                            str: {type:"system",msg:id+" invited"},
                            conversation_id: res.data
                        }
                        props.addMessage(newMessageData)
                    }
                    props.getUserConversations(accountId)
                })
                .reject(toast.error("Handling error occurred"))
            }
        
        })
        setIsContacts(false)

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
            str: JSON.stringify({type:"text",text:messageInput}),
            conversation_id: props.messenger.conversationData.linear_id
        }
        props.addMessage(newMessageData)
        .then(()=>{
            props.getConversationMessages(props.messenger.conversationData.linear_id)
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
                                    <Button variant="outline-secondary" block className="mb-2" onClick={() => setIsContacts(!isContacts)}>
                                        {isContacts?"Cancel":"New Message"}
                                    </Button>
                                    <Row>
                                        {
                                            isContacts?
                                            <>
                                                <div className="d-flex">
                                                    {/* static data */}
                                                    {props.contacts.map((contact,i)=>{
                                                        return(
                                                            <div className="d-block" onClick={()=>handleCreateConversation(contact.target_id)}>{contact.username}</div>
                                                        )
                                                    })}
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
                                                                            isSelected={props.messenger.conversationData.linear_id === conversation.conversation_id}
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
                                                            const str = JSON.parse(message.str)
                                                            console.log(str)
                                                            switch(str.type){
                                                                case "text":
                                                                    return(
                                                                        <UserMessageItem
                                                                        key={i}
                                                                            toggleReceiver={accountId === message?.user_id?true:false}
                                                                            message={str.text}
                                                                        />
                                                                    )
                                                                case "sys":
                                                                    return(
                                                                        <div className="d-block" variant="dark" style={{margin:'auto 0px'}}>str.text</div>
                                                                    )
                                                                case "emoji":
                                                                    return("")
                                                                case "image":
                                                                    return("")
                                                                default:
                                                                    return(
                                                                        <UserMessageItem
                                                                        key={i}
                                                                            toggleReceiver={accountId === message?.user_id?true:false}
                                                                            message={message}
                                                                        />
                                                                    )
                                                            }
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
    getContactList,
    clearConversations,
    clearConversationData,
    clearMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagingWindow)