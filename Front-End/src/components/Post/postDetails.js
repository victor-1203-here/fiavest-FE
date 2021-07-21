import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const PostDetails = (props) => {

    const {title, info, date} = props.location.state.posting;

    return (
        <div className="mainDetails">
            <div className="detailCon">
                <div>Title : </div>
                <div style={{textAlign: 'center', width: '60%'}} >{title}</div>
            </div>
            <div className="detailCon">
                <div>Information : </div>
                <div style={{textAlign: 'center', width: '60%'}} >{info}</div>
            </div>
            <div className="detailCon">
                <div>Date : </div>
                <div style={{textAlign: 'center', width: '60%'}} >{date}</div>
            </div>
            <Link to={'/posting'}>
                <button className="pageBtn">Back to Post</button>
            </Link>
        </div>
    )
}

export default PostDetails
