import React, { useState } from 'react'
import realApi from '../../api/test-api';
import '../../styles/component.css'
import InputCom from '../inputCom';
import InputAddress from '../inputAddress';
import InputPass from '../inputPass';
import InputBroking from '../inputBroking';
import InputTerm from '../inputTerm';

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
    const [isOthers, setIsOthers] = useState(false)
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
            await realApi.post("/public/register/new-via-email", info).then(
                async (resp) => {
                    const uuid = resp.data.uuid;
                    const sessionID = localStorage.getItem("SessionID");
                    const allInfo = {uuid, ...info}
                    await realApi.post("/private/user/update-user-details", allInfo, {headers:{'sessionId': sessionID}}).then(
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
                <InputCom 
                label="First Name :"
                type="text"
                name="nameGiven"
                value={info.nameGiven}
                PHolder="First Name"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Last Name :"
                type="text"
                name="nameFamily"
                value={info.nameFamily}
                PHolder="Last Name"
                onChange={(e) => inputHandler(e)}
                />
                <InputPass 
                label="Password :"
                name="password"
                value={info.password}
                PHolder="Password"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Email :"
                type="email"
                name="email"
                value={info.email}
                PHolder="Email Address"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Phone Number :"
                type="tel"
                name="phoneNum"
                value={info.phoneNum}
                PHolder="Phone Number"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Trading Exp :"
                type="text"
                name="tradingExp"
                value={info.tradingExp}
                PHolder="Trading Experience"
                onChange={(e) => inputHandler(e)}
                maxLength="2"
                />
                <InputBroking 
                defaultValue={info.brokingHouse}
                onChange={(e) => {
                    if (e.value === "Others") {
                        setIsOthers(true)
                        setInfo((old) => {
                            return {
                                ...old,
                                brokingHouse: ""
                            }
                        })
                    } else {
                        setIsOthers(false)
                        setInfo((old) => {
                            return {
                                ...old,
                                brokingHouse : e.value,
                            };
                        });
                    }
                }}
                />
                {isOthers === true ? 
                    <InputCom 
                    label="Other Broking House :"
                    type="text"
                    name="brokingHouse"
                    value={info.brokingHouse}
                    PHolder="Other Broking House"
                    onChange={(e) => inputHandler(e)}
                    /> : 
                    <> </>}
                <InputAddress 
                defaultValue={info.address}
                onChange={(e) => {
                    setInfo((old) => {
                        return {
                            ...old,
                            address : e.value,
                        };
                    });
                }}
                />
                <InputTerm 
                defaultValue={info.investmentTerm}
                onChange={(e) => {
                    setInfo((old) => {
                        return {
                            ...old,
                            investmentTerm : e.value,
                        };
                    });
                }}
                />
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