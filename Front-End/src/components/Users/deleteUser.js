import React from 'react'
import api from '../../api/api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'

const DeleteUser = (props) => {

    const {id, name, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.users

    const DeleteHandler = async (e) => {
        e.preventDefault()
        if (window.confirm(`The ${name} account will delete PERMANENTLY !`)) {
            await api.delete(`/users/${id}`).then(resp => {
            // console.log(resp.data)
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
        } else {
            return
        }
    }

    return (
        <div className="deleteCon">
            <div className="detailsTitle">! Delete account of <span style={{color: 'red'}}>{name}</span> ? !</div>
            <div className="deleteTitle">↓ {name}'s Details ↓</div>
            <div className="detailCon">
                <div className="deleteDetails">Name : </div>
                <div className="deleteInfo">{name}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Email Address : </div>
                <div className="deleteInfo">{email}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Broking House : </div>
                <div className="deleteInfo">{brokingHouse}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Phone Number : </div>
                <div className="deleteInfo">{phoneNum}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Address : </div>
                <div className="deleteInfo">{address}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Investment Term : </div>
                <div className="deleteInfo">{investTerm}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Trading Experience : </div>
                <div className="deleteInfo">{tradingExp}</div>
            </div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={DeleteHandler} >Delete</button>
                <Link to={'/users'}>
                    <button className="cancelBtn">Cancel</button>
                </Link>
            </div>
        </div>
    )

}

export default DeleteUser