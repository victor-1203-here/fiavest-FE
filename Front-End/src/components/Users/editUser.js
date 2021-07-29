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
            // console.log(resp)
            props.history.goBack()
        })
        // await testApi.post("/register/new-via-email", info).then(
        //     resp => {
        //         console.log(resp)
        //         props.history.goBack()
        //     }).catch(function (error) {
        //         if (error.response) {
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.request) {
        //             console.log(error.request);
        //         } else {
        //             console.log('Error', error.message);
        //         }
        // })
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
                    <label className="label" >Name : </label>
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
                    <label className="label" >Phone Num : </label>
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
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>SAVE</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )

}

export default EditUser