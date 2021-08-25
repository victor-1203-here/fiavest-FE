import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import testApi from '../../api/test-api';
import '../../styles/component.css'

const ClientCard = (props) => {

    // console.log(props.client);
    const [info, setInfo] = useState([])
    const [notFound, setNotFound] = useState(false)

    const getInfo = async () => {
        var sessionID = localStorage.getItem("SessionID");
        await testApi.post("/private/user/fetch-user-details", props.client , {headers: {'sessionId': sessionID}}).then((resp) => {
            setInfo(resp.data)
        }).catch(function(err) {
            console.log(err.response.data.error);
            if (err.response.data.error.message === "Not found") {
                setNotFound(true)
                setInfo(props.client.uuid)
            }
        })
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
                    <div>Could Not Found Client <span style={{fontWeight: "bold"}}>{info}</span>, Please delete this account and ask client create again</div>
                </div>
                <div className="listBtn">
                    <Link to={{pathname: `/deleteNotFound/${props.client.uuid}`, state:{uuid: info}}}>
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
                    <Link to={{pathname:`/client/${info.uuid}`, state:{clients: info}}}>
                        <button className="smallButton">DETAILS</button>
                    </Link>
                    <Link to={{pathname: `/editClient/${info.uuid}`, state:{clients: info}}}>
                        <button className="smallButton" >EDIT</button>
                    </Link>
                    <Link to={{pathname: `/deleteClient/${info.uuid}`, state:{clients: info}}}>
                        <button className="smallButton" >DELETE</button>
                    </Link>
                </div>
            </div>
        )}
        </>
    )
}

export default ClientCard
