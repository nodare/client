import React from 'react'
import PropTypes from "prop-types";
import * as ta from 'timeago.js'

import { Image } from "react-bootstrap";

function UserMessageItem(props) {
    return (
        <>
            <div className={`py-2 ${props.toggleReceiver?'text-right':'text-left'}`}>
                {!props.toggleReceiver?
                    <>
                        <Image 
                            src={"https://placekitten.com/100/100"}
                            style={{height:'50px'}}
                            className="my-1 px-2"
                            roundedCircle
                        ></Image>
                    </>
                :""}
                <div className={props.toggleReceiver?"text-primary":""}>
                    <span>{props.toggleReceiver?props.linear_id:""}</span>{props.message}
                </div>
                <small>{ta.format(props.dateSent)}</small>
                {/* <small>a few seconds ago</small> */}
            </div>
        </>
    )
}

export default UserMessageItem

UserMessageItem.propTypes = {
    toggleReceiver: PropTypes.bool,
    message: PropTypes.string,
    dateSent: PropTypes.string,
    isSelected: PropTypes.bool
}