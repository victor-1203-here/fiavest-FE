import React, { useState } from 'react'
import '../../styles/component.css'
import api from '../../api/api'

const EditClient = (props) => {

    const {id, name, password, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.clients

    // console.log(id)

    const [information, setInfo] = useState(
        {
            id: id,
            name: name,
            password: password,
            email: email,
            brokingHouse: brokingHouse,
            phoneNum: phoneNum,
            address: address,
            investTerm: investTerm,
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
        await api.put(`/clients/${information.id}`, information)
        .then(resp => {
            // console.log(resp)
            props.history.goBack()
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
                    <label className="label" >Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="name"
                    value={information.name}
                    placeholder="Name"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                {/* <div className="addCon">
                    <label className="label" >Password : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="password"
                    value={information.password}
                    placeholder="Password"
                    onChange={(e) => inputHandler(e)}
                    />
                </div> */}
                <div className="addCon">
                    <label className="label" >Email Address : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="email"
                    value={information.email}
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
                    name="investTerm"
                    value={information.investTerm}
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
