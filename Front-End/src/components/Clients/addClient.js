import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import testApi from '../../api/test-api';
import '../../styles/component.css'

const AddClient = (props) => {

    const [info, setInfo] = useState({
        name: "",
        password: "",
        email: "",
        brokingHouse: "",
        phoneNum: "",
        address: "",
        investTerm: "",
        tradingExp: "",
        activationCode: "",
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
        if (info.name === "" || info.password === "" || info.email === "" || info.brokingHouse === "" || info.phoneNum === "" || info.address === "" || info.investTerm === "" || info.tradingExp === "" || info.activationCode === "" ) {
            alert("Please fill up all of the info !")
            return
        } else {
            await testApi.post("/register/new-via-email", info).then(
                resp => {
                    console.log(resp)
                    props.history.goBack()
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
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
            <div className="formTitle">Add New Clients</div>
                <div className="addCon">
                    <label className="label" >Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="name"
                    value={info.name}
                    placeholder="Name"
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
                    name="investTerm"
                    value={info.investTerm}
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
                    name="activationCode"
                    value={info.activationCode}
                    placeholder="Activation Code"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>Add</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >Cancel</button>
            </div>
        </div>
    )
}

export default AddClient
