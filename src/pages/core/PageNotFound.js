import React from 'react';
import { Container, Alert } from "react-bootstrap";
export default function PageNotFound() {
    return (
        <>
            <Container className="align-items-center text-center vh-100">
                <div className="py-5">
                    <Alert variant="dark">
                        <h3>Oops! Page not found</h3>
                        <p>We couldn't find the page you are looking for. Sorry!</p>
                    </Alert>
                </div>
            </Container>
        </>
    )
}
