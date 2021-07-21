import React, { useState } from 'react'
import '../../styles/component.css'
import api from '../../api/api'

const EditUser = (props) => {
    
    const {id, name, password, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.users

    const [information, setInfo] = useState({
        id: id,
        name: name,
        password: password,
        email: email,
        brokingHouse: brokingHouse,
        phoneNum: phoneNum,
        address: address,
        investTerm: investTerm,
        tradingExp: tradingExp,
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
        await api.put(`/users/${information.id}`, information)
        .then(resp => {
            console.log(resp)
            props.history.goBack()
        })
    }

    return (
        <div className="editContainer">
            <div className="detailsTitle">~ Edit data and save it ~</div>
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
                <div className="addCon">
                    <label className="label" >Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="password"
                    value={information.password}
                    placeholder="Password"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Name : </label>
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
                    <label className="label" >Name : </label>
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
                    <label className="label" >Name : </label>
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
                    <label className="label" >Name : </label>
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
                    <label className="label" >Name : </label>
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
                    <label className="label" >Name : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="tradingExp"
                    value={information.tradingExp}
                    placeholder="Trading Experience"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <button className="cancelBtn">Save</button>
            </form>
        </div>
    )

}

export default EditUser