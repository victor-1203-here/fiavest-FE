import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const DataCard = (props) => {

    const {id, title, info, date} = props.post;

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem">{title}</div>
                <div className="listItem">{info}</div>
                <div className="listItem">{date}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/post/${id}`, state:{posting: props.post}}}>
                    <button className="smallButton">Details</button>
                </Link>
                <Link to={{pathname: '/edit', state:{posting: props.post}}}>
                    <button className="smallButton" >Edit</button>
                </Link>
                <Link to={{pathname: '/deletePost', state:{posting: props.post}}}>
                    <button className="smallButton">Delete</button>
                </Link>
            </div>
        </div>
    )
}

export default DataCard
