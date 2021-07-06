import React, {useState} from 'react'
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function UpvoteButton(props) {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpvoteButton = () => {
        props.handleUpvote()
    }

    return (
        <>
            {props.isUpvoted === (0 || false)?
            (
                <Button size="sm" variant="primary" onClick={() => handleUpvoteButton()}>
                    { props.upvoteName || "Upvote"}
                    {
                        props.count && props.count !== 0?
                        <> {props.count}</>
                        :""
                    }
                </Button>
            )
            :
            (
                <Button size="sm" variant="outline-primary" onClick={() => handleUpvoteButton()}>
                    { props.upvotedName || "Upvoted"}
                    {
                        props.count && props.count !== 0?
                        <> {props.count}</>
                        :""
                    }
                </Button>
            )
            }
        </>
    )
}

UpvoteButton.propTypes = {
    isUpvoted: PropTypes.any,
    count: PropTypes.number,
    handleUpvote: PropTypes.func.isRequired,
    upvoteName: PropTypes.string,
    upvotedName: PropTypes.string,
}