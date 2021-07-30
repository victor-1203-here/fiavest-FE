import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const UserCard = (props) => {

    const {id, name, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.user;

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem">{name}</div>
                <div className="listItem">{brokingHouse}</div>
                <div className="listItem">{phoneNum}</div>
                <div className="listItem">{address}</div>
                <div className="listItem">{investTerm}</div>
                <div className="listItem">{tradingExp}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/user/${id}`, state:{users: props.user}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/editUsers/${id}`, state:{users: props.user}}}>
                    <button className="smallButton" >EDIT</button>
                </Link>
                <Link to={{pathname: `/deleteUser/${id}`, state:{users: props.user}}}>
                    <button className="smallButton" >DELETE</button>
                </Link>
            </div>
        </div>
    )

}

export default UserCard