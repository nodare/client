import React, {useState} from 'react'
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function FollowButton(props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleFollowButton = () => {
        props.handleFollow()
    }

    return (
        <div>
            {props.isFollowed === false?
            (
                <Button variant="primary" onClick={() => handleFollowButton()}>
                    Follow
                </Button>
            )
            :
            (
                <Button variant="outline-primary" onClick={() => handleFollowButton()}>
                    Unfollow
                </Button>
            )
            }
        </div>
    )
}

FollowButton.propTypes = {
    isFollowed: PropTypes.any,
    handleFollow: PropTypes.func.isRequired
}