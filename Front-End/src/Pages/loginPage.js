import React, {useState} from 'react'
import api from '../api/api';
import testApi from '../api/test-api';
import login from '../img/login.png';
import '../styles/login.css';

function Login() {

    const [userData, setUserData] = useState({email:"", password: "", channel: "W"});
    const [errorMessage, setErrorMessage] = useState("");

    const inputHandler = (e) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    
    const submitHandler = async (e) => {
        console.log(userData)
        e.preventDefault();
        await testApi.post("/public/login", userData).then(
            resp => {
                console.log(resp)
                // props.history.goBack()
            }).catch(function (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.error.message)
                    console.log(error.response.data);
                    console.log(error.response.data.error.message);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
        // console.log(result)
        // try {
        //     var found = result.find(admin => admin.adminId === userData.adminId)
        //     // console.log(found.adminId)
        //     if (found.adminId === userData.adminId) {
        //         if (found.password === userData.password) {
        //             localStorage.setItem("isAuthenticated", "true");
        //             window.location.pathname = '/';
        //         } else {
        //             setErrorMessage({value : "Password Incorrect"});
        //         }
        //     } else {
        //         setErrorMessage({value : "Not a valid admin account"});
        //     }
        // }
        // catch(err) {
        //     setErrorMessage({ value : "Please Try Again"})
        // }
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
                        name="email" 
                        value={userData.email}
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    <div className="formInput">
                        <label>Password</label>
                        <input 
                        className="input"
                        type="text" 
                        name="password" 
                        value={userData.password}
                        onChange={(e) => inputHandler(e)} />
                    </div>
                    <div className="formInput">
                        <button className="loginButton" type="submit" onClick={submitHandler} >SIGN IN</button>
                    </div>

                    {errorMessage && (
                        <p className="errorContainer">{errorMessage}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login;