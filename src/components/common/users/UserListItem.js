import React from 'react'
import { Image } from "react-bootstrap";
import PropTypes from 'prop-types'

import { useUserDetails } from "util/helpers/hooks/user.hooks";

function UserListItem({user}) {
    const user = useUserDetails(props.user.linear_id)
    return (
        <>
            <div className="d-flex justify-content-left py-1">
                <Image src={"https://placekitten.com/200/200"} roundedCircle style={{height:"40px"}} className={"mr-3"}/>
                <div className="d-block">
                    <span><strong>{user?.username}</strong></span>
                    <span className="d-block">Owner</span>
                </div>
            </div>
        </>
    )
}

export default UserListItem

UserListItem.propTypes = {
    user: PropTypes.object.isRequired
}
