import React, {useState} from 'react'
import api from '../../api/api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'
import DeleteModal from '../deleteModal'

const DeleteClient = (props) => {

    const [showModal, setShowModal] = useState(false)
    const {id, name, email, brokingHouse, phoneNum, address, investTerm, tradingExp} = props.location.state.clients

    const DeleteHandler = async (e) => {
        e.preventDefault()
        await api.delete(`/clients/${id}`).then(resp => {
        // console.log(resp.data)
        props.history.goBack()
        }).catch(function(err) {
            console.log(err);
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
            <div className="topTitle">! Delete account of <span style={{color: 'red'}}>{name}</span> ? !</div>
            <div className="deleteTitle">↓ {name}'s Details ↓</div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Name : </div>
                <div className="deleteInfo">{name}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Email Address : </div>
                <div className="deleteInfo">{email}</div>
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
                <div className="deleteInfo">{investTerm}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Trading Experience : </div>
                <div className="deleteInfo">{tradingExp}</div>
            </div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={OpenModal} >DELETE</button>
                <Link to={'/'}>
                    <button className="cancelBtn">CANCEL</button>
                </Link>
            </div>
            <DeleteModal 
            showModal={showModal}
            closeModal={CloseModal}
            type="client"
            onDelete={DeleteHandler}
            onCloseModal={CloseModal}
            />
        </div>
    )
}

export default DeleteClient
