import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const ImageCard = (props) => {

    // console.log(props);
    const {base64, fileName, id} = props.image

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem" style={{width: '100%'}}>{fileName}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/viewImage/${id}`, state:{image: props.image}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/deleteImage/${id}`, state:{image: props.image}}}>
                    <button className="smallButton">DELETE</button>
                </Link>
            </div>
        </div>
    )
}

export default ImageCard
