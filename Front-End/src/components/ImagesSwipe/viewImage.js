import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const ViewImage = (props) => {

    // console.log(props.location.state.image);
    const {fileName, base64} = props.location.state.image

    return (
        <div className="mainImagePreview">
            <div className="label" style={{fontSize: "xx-large", textDecoration: "underline"}}>IMAGE PREVIEW</div>
            <img className="imageDetail" src={base64} alt="post" />
            <div className="imageFileName">File Name ▶ <span style={{color: "blue"}}>{fileName}</span></div>
            <Link to={'/imageSwiper'}>
                <button className="backBtn">BACK TO POST</button>
            </Link>
        </div>
    )
}

export default ViewImage
