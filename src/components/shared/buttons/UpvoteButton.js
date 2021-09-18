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
                <span size="sm" onClick={() => handleUpvoteButton()}>
                ●
                    {
                        props.count && props.count !== 0?
                        <> {props.count}</>
                        :""
                    }
                </span>
            )
            :
            (
                <span onClick={() => handleUpvoteButton()}>
                ○
                    {
                        props.count && props.count !== 0?
                        <> {props.count}</>
                        :""
                    }
                </span>
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