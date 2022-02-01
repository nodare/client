import React, {useState} from 'react'
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { replace } from 'lodash-es';

export default function FollowButton(props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleFollowButton = () => {
        props.handleFollow()
    }
    if(props.isLoggedIn == false){
        return (
            <Button variant="primary" onClick={() => window.location.replace('/login')}>
                Follow
            </Button>
        )
    }else if(props.isFollowed == 0){
        return (
            <Button variant="primary" onClick={() => handleFollowButton()}>
                Follow
            </Button>
        )
    }else if(props.isFollowed == 1){
        return (
            <Button variant="outline-primary" onClick={() => handleFollowButton()}>
                Unfollow
            </Button>
        )
    }else if(props.isFollowed == 2){
        return (
            <Button variant="outline-primary" onClick={() => handleFollowButton()} disabled>
                Unfollow
            </Button>
        )
    }else if(props.isFollowed ==3){
        return(
            <Button variant="outline-primary" onClick={() => handleFollowButton()} disabled>
                Bannned
            </Button>
        )
    }else{
        return(
            <Button variant="outline-primary" onClick={() => handleFollowButton()}>
                Follow
            </Button>
        )
    }
}

FollowButton.propTypes = {
    isFollowed: PropTypes.any,
    handleFollow: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.any
}