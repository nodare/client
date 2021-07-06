import React from 'react'
import { Image } from 'react-bootstrap'
import PropTypes from "prop-types";

const imageStyle={
    height: "40px",
    width: "40px"
}

function ProfileImageSmall(props) {
    return (
        <>
            <Image 
                src={props.imageUrl || "assets/placeholders/user-placeholder.png"}
                style={imageStyle}
                className="mr-2" 
                roundedCircle
            />
        </>
    )
}

function ProfileImageMedium(props) {
    return (
        <>
            <Image 
                src={props.imageUrl || "assets/placeholders/user-placeholder.png"}
                style={imageStyle}
                className="mr-2" 
                roundedCircle
            />
        </>
    )
}

function ProfileImageLarge(props) {
    return (
        <>
            <Image 
                src={props.imageUrl || "assets/placeholders/user-placeholder.png"}
                style={imageStyle}
                className="mr-2" 
                roundedCircle
            />
        </>
    )
}

export { ProfileImageSmall, ProfileImageMedium, ProfileImageLarge}

[ProfileImageSmall, ProfileImageMedium, ProfileImageLarge].propTypes = {
    imageUrl: PropTypes.string
}