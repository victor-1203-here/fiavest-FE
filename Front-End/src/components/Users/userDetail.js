import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const UserDetail = (props) => {

    const {name, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.users;

    const CopyHandler = (value) => {
        navigator.clipboard.writeText(value)
    }

    return (
        <div className="mainDetails">
            <div className="detailsTitle">~ Click the text to copy to clipboard ~</div>
            <div className="detailCon">
                <div>Name : </div>
                <a className="clickText" onClick={() => CopyHandler(name)}>{name}</a>
            </div>
            <div className="detailCon">
                <div>Email Address : </div>
                <a className="clickText" onClick={() => CopyHandler(email)}>{email}</a>
            </div>
            <div className="detailCon">
                <div>Broking House : </div>
                <div style={{textAlign: 'center', width: '50%'}} >{brokingHouse}</div>
            </div>
            <div className="detailCon">
                <div>Phone Number : </div>
                <a className="clickText" onClick={() => CopyHandler(phoneNum)}>{phoneNum}</a>
            </div>
            <div className="detailCon">
                <div>Address : </div>
                <div style={{textAlign: 'center', width: '50%'}} >{address}</div>
            </div>
            <div className="detailCon">
                <div>Investment Term : </div>
                <div style={{textAlign: 'center', width: '50%'}} >{investTerm}</div>
            </div>
            <div className="detailCon">
                <div>Trading Experience : </div>
                <div style={{textAlign: 'center', width: '50%'}} >{tradingExp}</div>
            </div>
            <Link to={'/users'}>
                <button className="cancelBtn">Back to User</button>
            </Link>
        </div>
    )

}

export default UserDetail