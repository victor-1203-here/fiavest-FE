import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'

import '../styles/navbar.css';
import '../styles/component.css'
import testApi from '../api/test-api';

Modal.setAppElement('#root')

const Navbar = () => {

    const [showModal, setShowModal] = useState(false)
    const [codeInfo, setCodeInfo] = useState({
        code: "",
        email: "",
    })
    const [errorItem, setErrorItem] = useState("")
    const [logoutError, setLogoutError] = useState("")

    const inputHandler = (e) => {
        setCodeInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const logoutHandler = async() => {
        const sessionID = localStorage.getItem("SessionID");
        // console.log(sessionID)
        await testApi.post("/private/logout", {}, {headers: {'sessionId':sessionID}}).then(
            resp => {
                // console.log(resp.data);
                localStorage.clear();
                window.location.pathname = "/login"
            }).catch(function (error) {
                if (error.response) {
                    setErrorItem(error.response.data.error.message)
                    // console.log(error.response.data.error.message);
                    if(error.response.data.error.message === "Session expired") {
                        localStorage.clear();
                        window.location.pathname = "/login"
                    }
                } else if (error.request) {
                    setErrorItem(error.request)
                    // console.log(error.request);
                } else {
                    setErrorItem(error.message)
                    // console.log('Error', error.message)
                }
            })
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
            setErrorItem("Empty Field Detected !")
        } else {
            const sessionID = localStorage.getItem("SessionID");
            await testApi.post("/private/activation/add-activation-codes", codeInfo, {headers:{'sessionId':sessionID}}).then(
                resp => {
                    // console.log(resp)
                    setShowModal(false)
                }).catch(function (error) {
                    if(error.response) {
                        setErrorItem(error.response.data.error.message)
                        if(error.response.data.error.message === "Session expired") {
                            setLogoutError("LOGOUT NOW")
                        } else {
                            setErrorItem("Something Wrong, Please Contact IT Department")
                        }
                    } else if (error.request) {
                        setErrorItem(error.request)
                    } else {
                        setErrorItem(error.message)
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
                        <div className="navLogOutBtn" onClick={logoutHandler}>LOGOUT</div>
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
                        {errorItem && (
                            <div className="errorCon">
                                <div>{errorItem}</div>
                                <div className="logoutText" onClick={logoutHandler}>{logoutError}</div>
                            </div>
                        )}
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