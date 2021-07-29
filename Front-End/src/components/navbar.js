import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'

import '../styles/navbar.css';
import testApi from '../api/test-api';

Modal.setAppElement('#root')

const Navbar = () => {

    const [showModal, setShowModal] = useState(false)
    const [codeInfo, setCodeInfo] = useState({
        code: "",
        email: "",
    })

    const inputHandler = (e) => {
        setCodeInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const logoutHandler = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    };

    const OpenModal = () => {
        setShowModal(true)
    }

    const CloseModal = () => {
        setShowModal(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if(codeInfo.code === "" || codeInfo.email === "" ) {
            alert("Please enter a code")
        } else {
            await testApi.post("/private/activation/add-activation-codes", codeInfo, {headers:{"Content-Type" : "application/json"}}).then(
                resp => {
                    console.log(resp)
                    setShowModal(false)
                }).catch(function (error) {
                    if(error.response) {
                        console.log(error.response);
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
    
    const modalStyle = {
        overlay : {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div>
                        <Link to={"/"} className="navBtn">CLIENTS</Link>
                        <Link to={"/users"} className="navBtn">USERS</Link>
                        <Link to={"/posting"} className="navBtn">POSTING</Link>
                    </div>
                    <div>
                        <div className="navBtn-1" onClick={logoutHandler}>LOGOUT</div>
                        <div className="navBtn" onClick={OpenModal} >ADD CODE</div>
                    </div>
                </div>
            </nav>
            <CSSTransition
            in={showModal}
            timeout={300}
            classNames="dialog"
            >
                <Modal 
                isOpen={showModal}
                onRequestClose={CloseModal}
                closeTimeoutMS={500}
                className="ModalCon"
                style={modalStyle}
                >
                    <form onSubmit={submitHandler} className="modalFormCon" >
                        <input
                        className="modalInput"
                        type="text"
                        name="code"
                        maxLength="10"
                        value={codeInfo.code}
                        placeholder="Activation Code"
                        onChange={e => inputHandler(e)}
                        />
                        <input
                        className="modalInput"
                        type="email"
                        name="email"
                        value={codeInfo.email}
                        placeholder="Client Email"
                        onChange={e => inputHandler(e)}
                        />
                    </form>
                    <div className="modalBtnCon">
                        <div onClick={submitHandler} className="modalBtn" >ADD</div>
                        <div onClick={CloseModal} className="modalBtn" >CLOSE</div>
                    </div>
                </Modal>
            </CSSTransition>
            
        </>
    )
}

export default Navbar