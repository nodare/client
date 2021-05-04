import React, {useState} from 'react'
import { Toast } from "react-bootstrap";
import * as ta from "timeago.js";

/* 
    props:
    show: boolean
    header: string
    time: string
    message: string
*/
function SuccessToast(props) {
    const [show, setShow] = useState( props.show || false)
    
    return (
        <>
            <Toast show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">{props.message || "header here"}</strong>
                    <small>{props.time || "time undefined"}</small>
                </Toast.Header>
                <Toast.Body>
                    {props.message}
                </Toast.Body>
            </Toast> 
        </>
    )
}

export default SuccessToast
