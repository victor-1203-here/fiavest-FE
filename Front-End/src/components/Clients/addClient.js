import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import testApi from '../../api/test-api';
import '../../styles/component.css'

const AddClient = (props) => {

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
        code: "",
    })

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
        if (info.name === "" || info.password === "" || info.email === "" || info.brokingHouse === "" || info.phoneNum === "" || info.address === "" || info.investmentTerm === "" || info.tradingExp === "" || info.code === "" ) {
            alert("Please fill up all of the info !")
            return
        } else {
            await testApi.post("/public/register/new-via-email", info).then(
                async (resp) => {
                    console.log(resp)
                    // TODO: get uuid from this resp then put into info
                    // const sessionID = localStorage.getItem("SessionID");
                    // await testApi.post("/private/user/update-user-details", info, {headers:{'sessionId':sessionID}}).then(
                    //     responce => {
                    //         console.log(responce);
                    //     }
                    // ).catch(function(err) {
                    //     if (err.response) {
                    //         console.log(err.response.data.error);
                    //         if(err.response.data.error.message === "Session expired") {
                    //             alert("Session Expired, Please Login Again")
                    //             localStorage.clear();
                    //             window.location.pathname = "/login"
                    //         } else {
                    //             alert("Something Happened, Please contact IT department")
                    //             return
                    //         }
                    //     } else if (err.request) {
                    //         console.log(err.request);
                    //     } else {
                    //         console.log('Error', err.message);
                    //     }
                    // })
                    // props.history.goBack()
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        if (error.response.data.error.message === "Invalid activation code") {
                            alert("Please make sure the combination of Email and Activation Code")
                            return
                        } else {
                            alert("Something Happened, Please contact IT department")
                            return
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                })
            }
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
            <div className="topTitle">Add New Clients</div>
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
                <div className="addCon">
                    <label className="label" >Activation Code : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="code"
                    value={info.code}
                    placeholder="Activation Code"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>ADD</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )
}

export default AddClient
