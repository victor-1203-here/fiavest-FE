import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const ViewImage = (props) => {

    // console.log(props.location.state.image);
    const {imgFileName, img} = props.location.state.image

    return (
        <div className="mainImagePreview">
            <div className="label" style={{fontSize: "xx-large", textDecoration: "underline"}}>IMAGE PREVIEW</div>
            <img className="imageDetail" src={`data:image/jpeg;base64,${img}`} alt="post" />
            <div className="imageFileName">File Name ▶ <span style={{color: "blue"}}>{imgFileName}</span></div>
            <Link to={'/imageSwiper'}>
                <button className="backBtn">BACK TO IMAGES</button>
            </Link>
        </div>
    )
}

export default ViewImage
