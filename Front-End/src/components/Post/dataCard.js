import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const DataCard = (props) => {

    const {id, url, date} = props.post;

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem" style={{width: '30%'}}>{id}</div>
                <div className="listItem" style={{width: '50%'}}>{url}</div>
                <div className="listItem"style={{width: '15%'}}>{date}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/post/${id}`, state:{posting: props.post}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: '/edit', state:{posting: props.post}}}>
                    <button className="smallButton" >EDIT</button>
                </Link>
                <Link to={{pathname: '/deletePost', state:{posting: props.post}}}>
                    <button className="smallButton">DELETE</button>
                </Link>
            </div>
        </div>
    )
}

export default DataCard
