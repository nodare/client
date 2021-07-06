import React from 'react'
import {
    Popover,
    OverlayTrigger
} from 'react-bootstrap'

const generalPopover = ({header, text}) => {
    return(
        <Popover>
            <Popover.Header as="h1">{header}</Popover.Header>
            <Popover.Content>{title}</Popover.Content>
        </Popover>
    )
}

export { generalPopover }
