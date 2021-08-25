import React, { useState } from 'react'
import '../../styles/component.css'
import realApi from '../../api/test-api';
import InputCom from '../inputCom';
import InputAddress from '../inputAddress';

const EditUser = (props) => {
    
    const {uuid, nameGiven, nameFamily, brokingHouse, phoneNum, address, investmentTerm, tradingExp} = props.location.state.users

    const [information, setInfo] = useState({
        uuid: uuid,
        nameGiven: nameGiven,
        nameFamily: nameFamily,
        brokingHouse: brokingHouse,
        phoneNum: phoneNum,
        address: address,
        investmentTerm: investmentTerm,
        tradingExp: tradingExp,
    })

    const [errorItem, setErrorItem] = useState("")
    const [logoutError, setLogoutError] = useState("")

    const inputHandler = (e) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        var sessionID = localStorage.getItem("SessionID")
        var resultExp = parseInt(information.tradingExp)
        information.tradingExp = resultExp
        await realApi.post("/private/user/update-user-details", information, {headers:{'Content-Type': 'application/json', 'sessionId': sessionID}}).then(
            resp => {
                // console.log(resp);
                props.history.goBack()
            }
        ).catch(function(err) {
            if (err.response) {
                setErrorItem(err.response.data.error.message)
                if(err.response.data.error.message === "Session expired") {
                    setLogoutError("LOGOUT NOW")
                } else {
                    setErrorItem("Something Wrong, Please contact IT department")
                }
            } else if (err.request) {
                setErrorItem(err.request);
            } else {
                setErrorItem('Error', err.message);
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    const addressHandler = (e) => {
        setInfo((old) => {
            return {
                ...old,
                address : e.value,
            };
        });
    };

    return (
        <div className="editContainer">
            <div className="topTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
            <InputCom 
                label="First Name :"
                type="text"
                name="nameGiven"
                value={information.nameGiven}
                PHolder="First Name"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Last Name :"
                type="text"
                name="nameFamily"
                value={information.nameFamily}
                PHolder="Last Name"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Broking House :"
                type="text"
                name="brokingHouse"
                value={information.brokingHouse}
                PHolder="Broking House"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Phone Number :"
                type="tel"
                name="phoneNum"
                value={information.phoneNum}
                PHolder="Phone Number"
                onChange={(e) => inputHandler(e)}
                />
                <InputAddress 
                defaultValue={information.address}
                onChange={(e) => addressHandler(e)}
                />
                <InputCom 
                label="Investment Term :"
                type="text"
                name="investmentTerm"
                value={information.investmentTerm}
                PHolder="Investment Term"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Trading Exp :"
                type="num"
                name="tradingExp"
                value={information.tradingExp}
                PHolder="Trading Experience"
                onChange={(e) => inputHandler(e)}
                />
                {errorItem && (
                    <div className="errorCon">
                        <div>{errorItem}</div>
                        <div className="logoutText" onClick={logout}>{logoutError}</div>
                    </div>
                )}
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>SAVE</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )

}

export default EditUser