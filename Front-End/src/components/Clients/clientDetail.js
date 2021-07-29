import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const ClientDetail = (props) => {

    const {name, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.clients;

    const CopyHandler = (value) => {
        // console.log(value)
        navigator.clipboard.writeText(value)
    }

    return (
        <div className="normalDetails">
            <div className="topTitle">~ Click the blue text to copy to clipboard ~</div>
            <div className="detailCon">
                <div className="detailLabel">Name : </div>
                <a className="clickText" onClick={() => CopyHandler(name)}>{name}</a>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Email Address : </div>
                <a className="clickText" onClick={() => CopyHandler(email)}>{email}</a>
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
                <div className="detailItem">{investTerm}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Trading Experience : </div>
                <div className="detailItem">{tradingExp}</div>
            </div>
            <Link to={'/'}>
                <button className="backBtn">BACK TO CLIENT</button>
            </Link>
        </div>
    )
}

export default ClientDetail
