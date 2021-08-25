import React, {useState} from 'react'
import realApi from '../api/test-api';
import login from '../img/login.png';
import '../styles/login.css';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal'

Modal.setAppElement('#root')

function Login() {

    const [userData, setUserData] = useState({email:"", password: "", channel: "W"});
    const [errorMessage, setErrorMessage] = useState("");

    const [modalMessage, setModalMessage] = useState("");
    const [recoverEmail, setRecoverEmail] = useState("")
    const [showModal, setShowModal] = useState(false)

    const inputHandler = (e) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const OpenModal = () => {
        setShowModal(true)
    }

    const CloseModal = () => {
        setModalMessage("")
        setShowModal(false)
    }
    
    const submitHandler = async (e) => {
        // console.log(userData)
        e.preventDefault();
        if (userData.email === "" || userData.password === "") {
            setErrorMessage("Empty Email / Password")
            return
        } else {
        await realApi.post("/public/login", userData).then(
            resp => {
                // console.log(resp.data);
                // console.log(resp.data.sessionId)
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("SessionID", resp.data.sessionId)
                window.location.pathname = '/';
            }).catch(function (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.error.message)
                    console.log(error.response);
                    // console.log(error.response.data.error.message);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    setErrorMessage(error.request)
                    // console.log(error.request);
                } else {
                    setErrorMessage(error.message)
                    // console.log('Error', error.message)
                }
            })
        }
    }

    const forgetHandler = async (e) => {
        e.preventDefault();
        if (recoverEmail === "") {
            setModalMessage("Email is required !")
        } else {
            // console.log(recoverEmail);
            const resetInfo = {email: recoverEmail, url: "http://localhost:3000/resetPass"}
            await realApi.post("/public/reset-password/request-via-email", resetInfo).then(
                resp => {
                    console.log(resp);
                    console.log(resp.config.data);
                    setModalMessage("Request has been sent, Please check your email.")
                }
            ).catch(function(err) {
                console.log(err);
                setModalMessage(err.response.data.error.message)
            })
        }
    }

    const modalStyle = {
        overlay : {
            backgroundColor: 'rgba(255, 255, 255, 0)',
        },
    };

    return (
        <div className="body">
            <div className="header">
                <div className="headerText">FiaVest Plus 2</div>
            </div>
            <div className="mainContainer">
                <img className="icon" src={login} alt="login" />
                <div className="title">SIGN IN</div>
                <form>
                    <div className="formInput">
                        <label style={{fontWeight: '600', letterSpacing: '1px'}}>ADMIN EMAIL</label>
                        <input 
                        className="input"
                        type="text" 
                        name="email"
                        placeholder="Admin Email"
                        value={userData.email}
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    <div className="formInput">
                        <label style={{fontWeight: '600', letterSpacing: '1px'}}>PASSWORD</label>
                        <input 
                        className="input"
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    {errorMessage && (
                        <p className="errorContainer">{errorMessage}</p>
                    )}
                </form>
                <div className="buttonContainer">
                    <button className="loginButton" type="submit" onClick={submitHandler} >SIGN IN</button>
                    <button className="loginButton" type="submit" onClick={OpenModal} >RESET PASSWORD</button>
                </div>
            </div>
            <CSSTransition
            in={showModal}
            timeout={300}
            classNames="dialog"
            >
                <Modal 
                isOpen={showModal}
                onRequestClose={CloseModal}
                closeTimeoutMS={500}
                className="forgetModal"
                style={modalStyle}
                >
                    <form className="forgetForm" onSubmit={forgetHandler} >
                        <div className="title">FORGOT PASSWORD ?</div>
                        <input 
                        className="forgetEmail"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="off"
                        onChange={(e) => setRecoverEmail(e.target.value)}
                        />
                    </form>
                    <div className="forgetBtnCon">
                        <div className="forgetBtn" onClick={forgetHandler} >RESET</div>
                        <div className="forgetBtn" onClick={CloseModal} >CLOSE</div>
                    </div>
                    {modalMessage && (
                        <div>
                            <p className="errorContainer">{modalMessage}</p>
                            <div className="forgetBtn" style={{width: "95%"}} onClick={CloseModal} >OK</div>
                        </div>
                    )}
                </Modal>
            </CSSTransition>
        </div>
    )
}

export default Login;