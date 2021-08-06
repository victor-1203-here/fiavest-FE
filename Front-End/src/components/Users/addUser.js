import React, { useState } from 'react'
import testApi from '../../api/test-api';
import '../../styles/component.css'

const AddUser = (props) => {

    const [info, setInfo] = useState({
        nameGiven: "",
        nameFamily: "",
        password: "",
        email: "",
        brokingHouse: "",
        phoneNum: "",
        address: "",
        investmentTerm: "",
        tradingExp: 0,
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
        if (info.nameGiven === "" || info.nameFamily === "" || info.password === "" ||  info.email === "" || info.brokingHouse === "" || info.phoneNum === "" || info.address === "" || info.investmentTerm === "" || info.tradingExp < 0  || info.tradingExp === null) {
            setErrorItem("Please Fill Up All Wisely !")
        } else {
            var resultExp = parseInt(info.tradingExp)
            info.tradingExp = resultExp
            await testApi.post("/public/register/new-via-email", info).then(
                async (resp) => {
                    const uuid = resp.data.uuid;
                    const sessionID = localStorage.getItem("SessionID");
                    const allInfo = {uuid, ...info}
                    await testApi.post("/private/user/update-user-details", allInfo, {headers:{'sessionId': sessionID}}).then(
                        response => {
                            // console.log(response.data);
                            props.history.goBack()
                        }
                    ).catch(function(err) {
                        if (err.response) {
                            setErrorItem(err.response.data.error);
                            if(err.response.data.error.message === "Session expired") {
                                setLogoutError("LOGOUT NOW")
                            } else {
                                setErrorItem("Something Happened, Please contact IT department")
                            }
                        } else if (err.request) {
                            // console.log(err.request);
                            setErrorItem(err.request)
                        } else {
                            // console.log('Error', err.message);
                            setErrorItem(err.message)
                        }
                    })
                }).catch(function (error) {
                    if (error.response) {
                            setErrorItem("Something Happened, Please contact IT department")
                    } else if (error.request) {
                        setErrorItem(error.request);
                    } else {
                        setErrorItem(error.message);
                    }
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
                <div className="topTitle">Add New User</div>
                <div className="addCon">
                    <label className="label" >First Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="nameGiven"
                    value={info.nameGiven}
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
                    value={info.nameFamily}
                    placeholder="Last Name"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Password : </label>
                    <input 
                    className="inputCon"
                    type="password" 
                    name="password"
                    value={info.password}
                    placeholder="Password"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Email : </label>
                    <input 
                    className="inputCon"
                    type="email" 
                    name="email"
                    value={info.email}
                    placeholder="Email Address"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Broking House : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="brokingHouse"
                    value={info.brokingHouse}
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
                    value={info.phoneNum}
                    placeholder="Phone Number"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Address : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="address"
                    value={info.address}
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
                    value={info.investmentTerm}
                    placeholder="Investment Term"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Trading Exp : </label>
                    <input 
                    className="inputCon"
                    type="number" 
                    name="tradingExp"
                    value={info.tradingExp}
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
                <button className="cancelBtn" onClick={submitHandler}>Add</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >Cancel</button>
            </div>
        </div>
    )

}

export default AddUser