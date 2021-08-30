import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const ImageCard = (props) => {

    // console.log(props);
    const {imgFileName, adId} = props.image

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem" style={{width: '100%'}}>{imgFileName}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/viewImage/${adId}`, state:{image: props.image}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/deleteImage/${adId}`, state:{image: props.image}}}>
                    <button className="smallButton">DELETE</button>
                </Link>
            </div>
        </div>
    )
}

export default ImageCard
