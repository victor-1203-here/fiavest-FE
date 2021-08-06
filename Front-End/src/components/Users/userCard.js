import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import testApi from '../../api/test-api';
import '../../styles/component.css'

const UserCard = (props) => {

    const [info, setInfo] = useState([])

    const getInfo = async () => {
        var sessionID = localStorage.getItem("SessionID");
        const responce = await testApi.post("/private/user/fetch-user-details", props.user , {headers: {'sessionId': sessionID}})
        return responce.data;
    }

    useEffect(() => {
        const getAllInfo = async () => {
            const allInfo = await getInfo();
            if(allInfo) setInfo(allInfo)
        };
        getAllInfo();
    }, [info])

    return (
        <div className="list">
            <div className="listContent">
            <div className="listItem">{info.nameGiven}</div>
                <div className="listItem">{info.brokingHouse}</div>
                <div className="listItem">{info.phoneNum}</div>
                <div className="listItem">{info.address}</div>
                <div className="listItem">{info.investmentTerm}</div>
                <div className="listItem">{info.tradingExp}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/user/${info.uuid}`, state:{users: info}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/editUsers/${info.uuid}`, state:{users: info}}}>
                    <button className="smallButton" >EDIT</button>
                </Link>
                <Link to={{pathname: `/deleteUser/${info.uuid}`, state:{users: info}}}>
                    <button className="smallButton" >DELETE</button>
                </Link>
            </div>
        </div>
    )

}

export default UserCard