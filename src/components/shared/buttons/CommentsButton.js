import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

function CommentsButton(props) {
    return (
        <>
            <Button variant={"outline-primary"} size={"sm"} onClick={() => props.handleClick()}>
                <FontAwesomeIcon icon={faComment}/> 
                {
                    props?.count && props?.count > 0?
                        props?.count === 1? " 1 Comment": ` ${props?.count} Comments`
                    :
                    " Comment"
                }
            </Button>
        </>
    )
}

export default CommentsButton

CommentsButton.propTypes = { 
    count: PropTypes.number,
    handleClick: PropTypes.func
}