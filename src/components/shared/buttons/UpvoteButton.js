import React, {useState} from 'react'
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function UpvoteButton(props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpvoteButton = () => {
        props.handleUpvote()
    }

    return (
        <div>
            {props.isUpvoted === 0?
            (
                <Button size="sm" variant="primary" onClick={() => handleUpvoteButton()}>
                    { props.upvoteName || "Upvote"}
                </Button>
            )
            :
            (
                <Button size="sm" variant="primary-outline" onClick={() => handleUpvoteButton()}>
                    { props.upvotedName || "Upvoted"}
                </Button>
            )
            }
        </div>
    )
}

UpvoteButton.propTypes = {
    isUpvoted: PropTypes.bool.isRequired,
    handleUpvote: PropTypes.func.isRequired,
    upvoteName: PropTypes.string,
    upvotedName: PropTypes.string
}