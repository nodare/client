import React, { useState } from 'react'
import { ButtonGroup, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";

export default function ChangeLayoutButtons(props) {
    const [selectedLayout, setSelectedLayout] = useState('list')
    
    const selectLayout = (value) => {
        props.handleChangeLayout(value)
        setSelectedLayout(value)
    }

    return (
        <ButtonGroup>
            <Button active={selectedLayout === 'list'} variant={"outline-secondary"} onClick={() => selectLayout('list')} ><FontAwesomeIcon icon={faList}/></Button>
            <Button active={selectedLayout === 'cards'} variant={"outline-secondary"} onClick={() => selectLayout('cards')} ><FontAwesomeIcon icon={faThLarge}/></Button>
        </ButtonGroup>
    )
}