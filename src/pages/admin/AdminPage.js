import React from 'react'
import { Container, Row, Col, Nav} from "react-bootstrap";
import { BrowserRouter as Router, Link, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import AdminTableComponent from "./../../components/tables/AdminTable";

const handleDelete = () => {
    console.log("delete action")
}

const handleChange = () => {
    console.log("view action")
}

const handleEditRecord = () => {
    console.log("edit action")
}

function AdminPage() {
    let { path, url } = useRouteMatch()
    console.log(path)

    return (
        <>
            <Router>
                <Container>
                    <Row>
                        <Col sm={12} md={3}>
                            <Nav className="flex-column">
                                <Nav.Link>
                                    <Link to={`${url}/`}>Dashboard</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/messages`}>messages</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/communitites`}>communities</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/posts`}>Posts</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/reports`}>Reports</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/store`}>Store</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to={`${url}/settings`}>Settings</Link>
                                </Nav.Link>
                                {/* <Nav.Link>Messages</Nav.Link>
                                <Nav.Link>Communities</Nav.Link>
                                <Nav.Link>Posts</Nav.Link>
                                <Nav.Link>Reports</Nav.Link>
                                <Nav.Link>Settings</Nav.Link>
                                <Nav.Link>Log-Out</Nav.Link> */}
                            </Nav>
                        </Col>
                        <Col sm={12} md={9}>
                            
                            Administrator's page

                            <Switch>
                                <Route exact  path={`${url}`}>
                                    <Redirect to={`${url}/dashboard`}></Redirect>
                                </Route>
                                <Route exact  path={`${url}/dashboard`}>
                                    {/* this is only a sample table. */}
                                    <AdminTableComponent 
                                        headers={["header1", "header2", "header3"]}
                                        changeAction={handleChange}
                                        deleteAction={handleDelete}
                                        data={[["111","11","1"],["222","22","2"],["333","33","3"]]}
                                    />
                                    {/* <AdminTableComponent/> */}
                                </Route>
                                <Route  exact path={`${path}/messages`}>Messages</Route>
                                <Route  exact path={`${path}/communities`}>Communities</Route>
                                <Route  exact path={`${path}/posts`}>Posts</Route>
                                <Route  exact path={`${path}/reports`}>Reports</Route>
                                <Route  exact path={`${path}/settings`}>Settings</Route>
                            </Switch>

                        </Col>
                    </Row>
                </Container>
            </Router>
        </>
    )
}

export default AdminPage
