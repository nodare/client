import React, {useState} from 'react'
import { Toast } from "react-bootstrap";
import * as ta from "timeago.js";


/* 
    props:
    type: string
    data: object = {
        show: boolean
        header: string
        time: string
        message: string
    }
*/

export const SuccessToast = (props) => {
    const [show, setShow] = useState(true)
    
    return (
        <>
            <Toast 
            animation={true}
            show={show} 
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px'
            }}
            delay={1000} 
            autohide
            >
                <Toast.Header>
                    <strong className="mr-auto">{props.header || "header here"}</strong>
                    <small>{props.time || "time undefined"}</small>
                </Toast.Header>
                <Toast.Body>
                    {props.message}
                </Toast.Body>
            </Toast> 
        </>
    )
}
