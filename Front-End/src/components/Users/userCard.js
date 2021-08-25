import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import testApi from '../../api/test-api';
import '../../styles/component.css'

const UserCard = (props) => {

    const [info, setInfo] = useState([])
    const [notFound, setNotFound] = useState(false)
    // console.log(props.user.uuid);

    const getInfo = async () => {
        var sessionID = localStorage.getItem("SessionID");
        await testApi.post("/private/user/fetch-user-details", props.user , {headers: {'sessionId': sessionID}}).then((resp) => {
            setInfo(resp.data)
        }).catch(function(err) {
            console.log(err.response.data.error);
            if (err.response.data.error.message === "Not found") {
                // alert(`User ${props.user.uuid} not found, Please contact user create account again and delete his account in here.`)
                setNotFound(true)
                setInfo(props.user.uuid)
            }
        });
    };

    useEffect(() => {
        const getAllInfo = async () => {
            await getInfo();
        };
        getAllInfo();
    }, [props])

    return (
        <>
        {notFound ? (
            <div className="notFound">
                <div className="notFoundContent">
                    <div>Could Not Found User <span style={{fontWeight: "bold"}}>{info}</span>, Please delete this account and ask user create again</div>
                </div>
                <div className="listBtn">
                    <Link to={{pathname: `/deleteNotFound/${props.user.uuid}`, state:{uuid: info}}}>
                        <button className="smallButton" >DELETE</button>
                    </Link>
                </div>
            </div>
        ) : (
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
                {/* <Link to={{pathname:`/user/${props.user.uuid}`, state:{users: props}}}> */}
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/editUsers/${info.uuid}`, state:{users: info}}}>
                {/* <Link to={{pathname: `/editUsers/${props.user.uuid}`, state:{users: props}}}> */}
                    <button className="smallButton" >EDIT</button>
                </Link>
                <Link to={{pathname: `/deleteUser/${info.uuid}`, state:{users: info}}}>
                {/* <Link to={{pathname: `/deleteUser/${props.user.uuid}`, state:{users: props}}}> */}
                    <button className="smallButton" >DELETE</button>
                </Link>
            </div>
        </div>
        )}
        </>
    )

}

export default UserCard