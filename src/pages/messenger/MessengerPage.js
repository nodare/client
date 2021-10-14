/* 
    This is the very index component of Nodaq's messenger.
    Any connected components and state are stored here. 
*/

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Col, Row, Form, Image,Card,Spinner, Nav,Container } from "react-bootstrap";
import { Input,Avatar  } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import {ChatItem,SystemMessage,MessageBox} from 'react-chat-elements'
import { 
    getUserConversations,
    getConversationUsers,
    getConversationMessages,
    getConversationData,
    addConversation,
    addConversationUsers,
    addMessage,
    duplicationCheck,
    clearConversations,
    clearConversationData,
    clearMessages
} from "util/redux/actions/messages.actions";
import {
    getContactList,
    getUserName
} from "util/redux/actions/users.actions";

import UserConversationItem from "components/messaging/sub-components/UserConversationItem";
import UserMessageItem from "components/messaging/sub-components/UserMessageItem";
import toast from 'react-hot-toast'
import { UiContext } from 'pages'

function MessagingWindow(props) {
    const ui = React.useContext(UiContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [isContacts, setIsContacts] = useState(false)
    const [messageInput, setMessageInput] = useState("")
    const [accountId,setAccountId] = useState(ui?.currentUser?.linear_id)

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
            console.log(res)
            if(props.messenger.dup.status==1){
                handleSelectConversation(props.messenger.dup.linear_id)
            }else{
                let newConversationData = {
                    type:1,
                    status:1,
                }
               props.addConversation(newConversationData)
                .then(()=>{
                    console.log(props.messenger.dup.linear_id)
                    const users = [{
                        user_id: accountId
                    },
                    {
                        user_id: id
                    }]
                    users.map(user=>{
                        props.addConversationUsers({
                            conversation_id: props.messenger.conversationData.linear_id,
                            user_id: user.user_id
                        })
                    })
                    //INV BAN ADM
                    let newMessageData = {
                        user_id: accountId,
                        str: JSON.stringify({type:"sys",user_id:props.userinfo.username,code:"OP"}),
                        conversation_id: props.messenger.conversationData.linear_id
                    }
                    props.addMessage(newMessageData)
                    handleSelectConversation(props.messenger.conversationData.linear_id)
                    props.getUserConversations(accountId)
                })
            }
        
        })
        setIsContacts(false)

    }

    const handleSelectConversation = (conversationLinearId) => {
        setIsMessagesLoading(true)
        props.getConversationData(conversationLinearId)
        .then(()=>{
                setTimeout(() => {
                    setIsMessagesLoading(false)
                    props.getConversationMessages(conversationLinearId)
            }, 1000);
        })
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
        })
        setMessageInput("")

    }
    const handleUsername = (id) => {
        props.getUserName(id)
    }

    useEffect(() => {
        setIsLoading(true)
        loadConversations()
        loadContacts()
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if(props.messenger.conversations.length !== 0){
            props.getConversationData(props.messenger.conversations[0].linear_id)
            props.getConversationMessages(props.messenger.conversations[0].conversation_id)
        }
    }, [props.messenger.conversations])

    return (
        <>
                <Container>
                    <Row>
                    {isLoading?
                        <div className="mx-auto text-center">
                            <Spinner animation="border" variant="primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    :
                        <>
                            
                                {/* list of users */}
                                <Col xs={12} md={12} lg={5} xl={4}>
                                    <Button variant="outline-secondary" block className="mb-2" onClick={() => setIsContacts(!isContacts)}>
                                        {isContacts?"Cancel":"New Message"}
                                    </Button>
                                        {
                                            isContacts?
                                            <>
                                                <div className="d-flex">
                                                    {
                                                    props.userinfo?.contacts?.length === 0?
                                                        <>
                                                            You have no friends as of now
                                                        </>
                                                        :
                                                        props.userinfo?.contacts?.map((contact,i)=>{
                                                        return(
                                                            <ChatItem
                                                            className={'w-100'}
                                                            avatar={"https://placekitten.com/100/100"}
                                                            onClick={()=>handleCreateConversation(contact.target_id)}
                                                            title={contact.username}
                                                            subtitle={'Profile text'}
                                                            statusText={'Online'}
                                                            />
                                                        )
                                                    })
                                                }
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
                                                    <Nav variant="pills" justify>
                                                        <>
                                                            {props.messenger?.conversations?.map((conversation,i)=>{
                                                                return(
                                                                        <Nav.Item>
                                                                        <ChatItem
                                                                            title={conversation.title || "Hot conversation"}
                                                                            className={'w-100'}
                                                                            avatar={"https://placekitten.com/100/100"}
                                                                            alt={'Nodaq'}
                                                                            subtitle={"Newest message should be displayed"}
                                                                            onClick={()=>handleSelectConversation(conversation.conversation_id)}
                                                                            date={new Date()}
                                                                            unread={0}
                                                                        />
                                                                        </Nav.Item>
                                                                )
                                                            })}
                                                        </>
                                                    </Nav>
                                                }
                                            </>
                                        }
                                </Col>
                                    

                                {/* messages here */}
                                <Col xs={12} md={12} lg={7} xl={8}>
                                <Card>
                                    <Card.Header>{"A new chat room"}</Card.Header>
                                    <Card.Body>
                                    {
                                        isMessagesLoading?
                                            <div className="mx-auto text-center">
                                                <Spinner animation="border" variant="primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                                </Spinner>
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
                                                            switch(str.type){
                                                                case "text":
                                                                    return(
                                                                        <UserMessageItem
                                                                        key={i}
                                                                            toggleReceiver={accountId === message?.user_id?true:false}
                                                                            message={str.text}
                                                                            dateSent={message.date_sent}
                                                                        />)
                                                                case "sys":
                                                                        const event_code={
                                                                            "INV":"invited",
                                                                            "BAN":"banned",
                                                                            "ADM":"became admin",
                                                                            "OP":"Chatroom opened-"
                                                                        }
                                                                            return(
                                                                                <SystemMessage text={event_code[str.code]}/>
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
                                                                            message={str.text}
                                                                        />
                                                                    )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </>
                                        
                                    }
                                    </Card.Body>
                                        <Card.Footer>
                                        <Input
                                            className={"w-100"}
                                            width={"100%"}
                                            defaultValue={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            multiline={false}
                                            autoHeight={true}
                                            minHeight={40}
                                            autofocus={true}
                                            placeholder="Write your message here.."
                                            rightButtons={
                                                <Button variant={"primary"} onClick={() => handleSendMessage()}>Send</Button>
                                            }/>
                                        </Card.Footer>
                                        </Card>
                                </Col>
                        </>
                    }
                   </Row>
                </Container> 
        </>
    )
}

const mapStateToProps = state => ({
    messenger: state.messages,
    userinfo: state.users
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
    getUserName,
    duplicationCheck,
    clearConversations,
    clearConversationData,
    clearMessages,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagingWindow)