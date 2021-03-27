import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { 
    Card, 
    Image,
    Spinner,
    Breadcrumb,
    Jumbotron
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import UserCommunityListPage from "./UserCommunityListPage";

function UserCommunityViewPage() {
    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/home">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/community">
                    Communities
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Name of community</Breadcrumb.Item>
            </Breadcrumb>
            <Jumbotron>
                <h1>Name of community</h1>
            </Jumbotron>
            {/* <UserCommunityListPage/> */}

            {
                isLoading === true?(
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="dark"></Spinner>
                    </div>
                ):(
                    /* communities */
                    
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}>
                        <Masonry>
                            <LinkContainer to="/community/post/create">
                                <Card className="p-3 mb-2 mx-1">
                                    <h4 className="text-center">Create new post</h4>
                                </Card>
                            </LinkContainer>
                            <LinkContainer to="/community/123/post/123">
                                <Card className="p-3 mb-2 mx-1">
                                    <Image src="https://placekitten.com/200/250" fluid></Image>
                                    <div className="text-center py-2">
                                        <h4>
                                            Community Name
                                        </h4>
                                    </div>
                                </Card>
                            </LinkContainer>
                            <LinkContainer to="/community/123/post/234">
                                <Card className="p-3 mb-2 mx-1">
                                    <Image src="https://placekitten.com/200/150" fluid></Image>
                                    <div className="text-center py-2">
                                        <h4>
                                            Community Name
                                        </h4>
                                    </div>
                                </Card>
                            </LinkContainer>
                            <LinkContainer to="/community/123/post/234">
                                <Card className="p-3 mb-2 mx-1">
                                    <Image src="https://placekitten.com/200/200" fluid></Image>
                                    <div className="text-center py-2">
                                        <h4>
                                            Community Names
                                        </h4>
                                    </div>
                                </Card>
                            </LinkContainer>
                            <LinkContainer to={"/community/123/post/234"}>
                                <Card className="p-3 mb-2 mx-1">
                                    <Image src="https://placekitten.com/200/250" fluid></Image>
                                    <div className="text-center py-2">
                                        <h4>
                                            Community Name
                                        </h4>
                                    </div>
                                </Card>
                            </LinkContainer>
                            <Card className="p-3 mb-2 mx-1">
                                <Image src="https://placekitten.com/200/150" fluid></Image>
                                <div className="text-center py-2">
                                    <h4>
                                        Community Name
                                    </h4>
                                </div>
                            </Card>
                            <Card className="p-3 mb-2 mx-1">
                                <Image src="https://placekitten.com/200/200" fluid></Image>
                                <div className="text-center py-2">
                                    <h4>
                                        Community Name
                                    </h4>
                                </div>
                            </Card>
                            <Card className="p-3 mb-2 mx-1">
                                <Image src="https://placekitten.com/200/300" fluid></Image>
                                <div className="text-center py-2">
                                    <h4>
                                        Community Name
                                    </h4>
                                </div>
                            </Card>
                            <Card className="p-3 mb-2 mx-1">
                                <Image src="https://placekitten.com/200/299" fluid></Image>
                                <div className="text-center py-2">
                                    <h4>
                                        Community Name
                                    </h4>
                                </div>
                            </Card>
                            <Card className="p-3 mb-2 mx-1">
                                <Image src="https://placekitten.com/200/200" fluid></Image>
                                <div className="text-center py-2">
                                    <h4>
                                        Community Name
                                    </h4>
                                </div>
                            </Card>
                        </Masonry>
                    </ResponsiveMasonry>

                )
            }

            
        </div>
    )
}

export default UserCommunityViewPage
