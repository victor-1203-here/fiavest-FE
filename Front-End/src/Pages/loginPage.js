import React, {useState} from 'react'
import api from '../api/api';
import login from '../img/login.png';
import '../styles/login.css';

function Login() {

    const [userData, setUserData] = useState({adminId:"", password: ""});
    const [errorMessage, setErrorMessage] = useState({value: ""});

    const inputHandler = (e) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    
    const submitHandler = async (e) => {

        e.preventDefault();
        const responce = await api.get("/admins");
        const result = responce.data;
        // console.log(result)
        try {
            var found = result.find(admin => admin.adminId === userData.adminId)
            // console.log(found.adminId)
            if (found.adminId === userData.adminId) {
                if (found.password === userData.password) {
                    localStorage.setItem("isAuthenticated", "true");
                    window.location.pathname = '/';
                } else {
                    setErrorMessage({value : "Password Incorrect"});
                }
            } else {
                setErrorMessage({value : "Not a valid admin account"});
                setUserData({adminId: "", password: ""})
            }
        }
        catch(err) {
            setErrorMessage({ value : "Something Wrong Happened"})
        }
    }

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
                        <label>Admin ID</label>
                        <input 
                        className="input"
                        type="text" 
                        name="adminId" 
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    <div className="formInput">
                        <label>Password</label>
                        <input 
                        className="input"
                        type="password" 
                        name="password" 
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    <div className="formInput">
                        <button className="loginButton" type="submit" onClick={submitHandler} >SIGN IN</button>
                    </div>

                    {errorMessage.value && (
                        <p className="errorContainer">{errorMessage.value}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login;