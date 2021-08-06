import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const UserDetail = (props) => {

    const {nameGiven, nameFamily, brokingHouse, phoneNum, address, investmentTerm, tradingExp} = props.location.state.users;

    const CopyHandler = (value) => {
        navigator.clipboard.writeText(value)
    }

    return (
        <div className="normalDetails">
            <div className="topTitle">~ Click the text to copy to clipboard ~</div>
            <div className="detailCon">
                <div className="detailLabel">Name Given : </div>
                <a className="clickText" onClick={() => CopyHandler(nameGiven)}>{nameGiven}</a>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Name Family : </div>
                <a className="clickText" onClick={() => CopyHandler(nameFamily)}>{nameFamily}</a>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Broking House : </div>
                <div className="detailItem">{brokingHouse}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Phone Number : </div>
                <a className="clickText" onClick={() => CopyHandler(phoneNum)}>{phoneNum}</a>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Address : </div>
                <div className="detailItem">{address}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Investment Term : </div>
                <div className="detailItem">{investmentTerm}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Trading Experience : </div>
                <div className="detailItem">{tradingExp}</div>
            </div>
            <Link to={'/users'}>
                <button className="backBtn">Back to User</button>
            </Link>
        </div>
    )

}

export default UserDetail