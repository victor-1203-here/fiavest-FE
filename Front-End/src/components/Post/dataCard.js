import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const DataCard = (props) => {

    const {id, url, title, body, fileName, date} = props.post;

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem" style={{width: '15%'}}>{title}</div>
                <div className="listItem" style={{width: '25%'}}>{body}</div>
                <div className="listItem" style={{width: '10%'}}>{fileName}</div>
                <div className="listItem" style={{width: '40%'}}>{url}</div>
                <div className="listItem"style={{width: '10%'}}>{date}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/post/${id}`, state:{posting: props.post}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/editPost/${id}`, state:{posting: props.post}}}>
                    <button className="smallButton" >EDIT</button>
                </Link>
                <Link to={{pathname: `/deletePost/${id}`, state:{posting: props.post}}}>
                    <button className="smallButton">DELETE</button>
                </Link>
            </div>
        </div>
    )
}

export default DataCard
