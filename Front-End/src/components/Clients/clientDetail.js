import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const ClientDetail = (props) => {

    const {nameGiven, nameFamily, brokingHouse, phoneNum, address, investmentTerm, tradingExp} = props.location.state.clients;

    const CopyHandler = (value) => {
        // console.log(value)
        navigator.clipboard.writeText(value)
    }

    return (
        <div className="normalDetails">
            <div className="topTitle">~ Click the blue text to copy to clipboard ~</div>
            <div className="detailCon">
                <div className="detailLabel">Name Given : </div>
                <div className="clickText" onClick={() => CopyHandler(nameGiven)}>{nameGiven}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Name Family : </div>
                <div className="clickText" onClick={() => CopyHandler(nameFamily)}>{nameFamily}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Broking House : </div>
                <div className="detailItem">{brokingHouse}</div>
            </div>
            <div className="detailCon">
                <div className="detailLabel">Phone Number : </div>
                <div className="clickText" onClick={() => CopyHandler(phoneNum)}>{phoneNum}</div>
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
            <Link to={'/'}>
                <button className="backBtn">BACK TO CLIENT</button>
            </Link>
        </div>
    )
}

export default ClientDetail
