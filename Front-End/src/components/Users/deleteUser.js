import React, {useState} from 'react'
import testApi from '../../api/test-api'
import '../../styles/component.css'
import DeleteModal from '../deleteModal'
import { Link } from 'react-router-dom'

const DeleteUser = (props) => {
    // console.log(props.location.state.users);
    const [showModal, setShowModal] = useState(false)
    const {uuid, nameGiven, nameFamily, brokingHouse, phoneNum, address, investmentTerm, tradingExp} = props.location.state.users

    console.log(uuid);

    const DeleteHandler = async (e) => {
        e.preventDefault()
        var sessionID = localStorage.getItem("SessionID")
        await testApi.post("/private/user/delete-account", {uuid: uuid} , {headers: {'sessionId': sessionID}}).then(
            resp => {
                // console.log(resp);
                props.history.goBack()
            }
        ).catch(function(err) {
            console.log(err.response.data.error.message);
            if (err.response.data.error.message === "Session expired") {
                alert("Session Expired, Please Log In Again")
                localStorage.clear();
                window.location.pathname = "/login"
            }
        })
    }

    const OpenModal = () => {
        setShowModal(true)
    }

    const CloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className="deleteCon">
            <div className="topTitle">! Delete account of <span style={{color: 'red'}}>{nameGiven}</span> ? !</div>
            <div className="deleteTitle">↓ {nameGiven}'s Details ↓</div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Full Name : </div>
                <div className="deleteInfo">{nameGiven} {nameFamily}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Broking House : </div>
                <div className="deleteInfo">{brokingHouse}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Phone Number : </div>
                <div className="deleteInfo">{phoneNum}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Address : </div>
                <div className="deleteInfo">{address}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Investment Term : </div>
                <div className="deleteInfo">{investmentTerm}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Trading Experience : </div>
                <div className="deleteInfo">{tradingExp}</div>
            </div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={OpenModal} >DELETE</button>
                <Link to={'/users'}>
                    <button className="cancelBtn">CANCEL</button>
                </Link>
            </div>
            <DeleteModal 
            showModal={showModal}
            closeModal={CloseModal}
            type="user"
            onDelete={DeleteHandler}
            onCloseModal={CloseModal}
            />
        </div>
    )

}

export default DeleteUser