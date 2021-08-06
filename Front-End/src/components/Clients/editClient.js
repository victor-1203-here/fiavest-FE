import React, { useState } from 'react'
import '../../styles/component.css'
import testApi from '../../api/test-api';

const EditClient = (props) => {

    // console.log(props.location.state.clients);
    const {uuid, nameGiven, nameFamily, brokingHouse, phoneNum, address, investmentTerm, tradingExp} = props.location.state.clients

    const [information, setInfo] = useState(
        {
            uuid: uuid,
            nameGiven: nameGiven,
            nameFamily: nameFamily,
            brokingHouse: brokingHouse,
            phoneNum: phoneNum,
            address: address,
            investmentTerm: investmentTerm,
            tradingExp: tradingExp,
        }
    )
    
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
        await testApi.post("/private/user/update-user-details", information, {headers:{'Content-Type': 'application/json', 'sessionId': sessionID}}).then(
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

    return (
        <div className="editContainer">
            <div className="topTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
                <div className="addCon">
                    <label className="label" >First Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="nameGiven"
                    value={information.nameGiven}
                    placeholder="First Name"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Last Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="nameFamily"
                    value={information.nameFamily}
                    placeholder="Last Name"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Broking House : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="brokingHouse"
                    value={information.brokingHouse}
                    placeholder="Broking House"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Phone Number : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="phoneNum"
                    value={information.phoneNum}
                    placeholder="Date"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Address : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="address"
                    value={information.address}
                    placeholder="Address"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Investment Term : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="investmentTerm"
                    value={information.investmentTerm}
                    placeholder="Investment Term"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Trading Exp : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="tradingExp"
                    value={information.tradingExp}
                    placeholder="Trading Experience"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
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

export default EditClient
