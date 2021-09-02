import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'

import '../styles/navbar.css';
import '../styles/component.css'
import realApi from '../api/test-api';

Modal.setAppElement('#root')

const Navbar = () => {

    const [showModal, setShowModal] = useState(false)
    const [codeInfo, setCodeInfo] = useState({
        code: "",
        email: "",
    })
    const [errorItem, setErrorItem] = useState("")
    const [logoutError, setLogoutError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

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
        await realApi.post("/private/logout", {}, {headers: {'sessionId':sessionID}}).then(
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
        setCodeInfo((old) => {
            return {
                ...old,
                code: "",
                email: ""
            }
        })
        setErrorItem("")
        setIsSuccess(false)
        setShowModal(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if(codeInfo.code === "" || codeInfo.email === "" ) {
            setErrorItem("Empty Field Detected !")
        } else {
            setErrorItem("")
            const sessionID = localStorage.getItem("SessionID");
            await realApi.post("/private/activation/add-activation-codes", codeInfo, {headers:{'sessionId':sessionID}}).then(
                resp => {
                    // console.log(resp)
                    setIsSuccess(true)
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
            setIsSuccess(true)
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
                        <Link to={"/"} className="navBtn" style={{marginLeft: "10px"}}>CLIENTS</Link>
                        <Link to={"/users"} className="navBtn">USERS</Link>
                        <Link to={"/posting"} className="navBtn">POSTING</Link>
                        <Link to={"/imageSwiper"} className="navBtn">IMAGES SLIDER</Link>
                        <Link to={"/charts"} className="navBtn">CHARTS</Link>
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
                        autoComplete="off"
                        value={codeInfo.code}
                        placeholder="Activation Code"
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = 'Activation Code'}
                        onChange={e => inputHandler(e)}
                        />
                        <input
                        className="modalInput"
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={codeInfo.email}
                        placeholder="Client Email"
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = 'Email Address'}
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
                        {isSuccess ? (
                            <div className="modalBtn" onClick={CloseModal}>OK</div>
                        ) : (
                        <>
                        <div onClick={submitHandler} className="modalBtn" >ADD</div>
                        <div onClick={CloseModal} className="modalBtn" >CLOSE</div>
                        </>
                        )}
                    </div>
                    {isSuccess ? (
                        <div className="successMessage">
                            <h1>Code Added Ssuccessfully !</h1>
                            <div style={{fontSize: "large"}}>code for <span style={{fontSize: "x-large"}}>{codeInfo.email}</span> is <span style={{fontSize: "x-large"}}>{codeInfo.code}</span> </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </Modal>
            </CSSTransition>
            
        </>
    )
}

export default Navbar