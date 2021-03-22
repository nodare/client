import React, {useState} from 'react'
import { Button } from "react-bootstrap";

function UpvoteButton(props) {
    const [isVoted, setIsVoted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const toggleVote = () => {
        setIsVoted(!isVoted)
    }

    return (
        <div>
            {isVoted === false?
            (<Button size="sm" variant="primary" onClick={toggleVote}>Upvote</Button>)
            :
            (<Button size="sm" variant="primary-outline" onClick={toggleVote}>Upvoted</Button>)
            }
        </div>
    )
}

export default UpvoteButton