import React from 'react'
import { ButtonGroup, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";

export default function ChangeLayoutButtons(props) {
    return (
        <>
            <ButtonGroup>
                <Button variant={"outline-secondary"} onClick={() => props.handleChangeLayout('cards')} ><FontAwesomeIcon icon={faThLarge}/></Button>
                <Button variant={"outline-secondary"} onClick={() => props.handleChangeLayout('list')} ><FontAwesomeIcon icon={faList}/></Button>
            </ButtonGroup>
        </>
    )
}