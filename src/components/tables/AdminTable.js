import React from 'react'
import { Table, Button } from "react-bootstrap";


function AdminTableComponent(props) {
    console.log(props)
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        {props.headers?.map((header, i)=>{
                            return(
                                <th key={i}>{header}</th>
                            )
                        })}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data?.map((row, i) => {
                            return (
                                <tr>
                                    {row?.map((cell, i) => {
                                        return (
                                            <td key={i}>{cell}</td>
                                        )
                                    })}
                                    <td>
                                        {(props?.changeAction === undefined ? "" : <Button variant="success" onClick={() => props.changeAction()}>Edit</Button>)}
                                        {(props?.deleteAction === undefined ? "" : <Button variant="danger" onClick={() => props.deleteAction()}>Delete</Button>)}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default AdminTableComponent
