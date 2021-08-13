import React, { useState, useEffect } from 'react'
import testApi from '../api/test-api'
import '../styles/reset.css'

const ResetPage = (props) => {

    // console.log(props);
    const uuid = ((props.location.search).slice(6))
    // console.log(uuid);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        newPasswordConfirm: "",
    })
    const [info, setInfo] = useState()
    const [isShow, setIsShow] = useState(true)

    const [errorItem, setErrorItem] = useState("")

    const retriveInfo = async () => {
        const responce = await testApi.get(`/public/reset-password/status/${uuid}?uuid=${uuid}`).catch(function(err) {
            console.log(err.response);
            if(err.response.data.error.message === "Session expired") {
                alert("Session Expired, Please Login Again")
                localStorage.clear();
                window.location.pathname = "/login"
            } else {
                console.log(err.response.data)
            }
        })
        console.log(responce);
        // return responce.data.data;
    };

    const inputHandler = (e) => {
        setPasswords((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const resetHandler = async (e) => {
        e.preventDefault()
        if (passwords.newPassword === "" || passwords.newPasswordConfirm === "") {
            setErrorItem("Empty Field Found")
        } else {
            console.log(info);
            console.log(passwords);
        }
    }

    const showHandler = () => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        const getInfo = async () => {
            const allInfo = await retriveInfo();
            if(allInfo) setInfo(allInfo)
        }
        getInfo()
    }, [])

    return (
        <div className="resetBody">
            <div className="resetContainer">
                <div className="resetTitle">Reset Password</div>
                <div className="resetContent">Reset password for "email"</div>
                <form className="resetForm" onSubmit={resetHandler}>
                    {isShow ? 
                    <>
                        <div className="resetInput">
                            <div>New Password ▶</div>
                            <input 
                            className="resetInputPass"
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            placeholder="New Password"
                            onChange={(e) => inputHandler(e)}
                            />
                        </div>
                        <div className="resetInput">
                            <div>Confirm Password ▶</div>
                            <input 
                            className="resetInputPass"
                            type="password"
                            name="newPasswordConfirm"
                            value={passwords.newPasswordConfirm}
                            placeholder="Confirm Password"
                            onChange={(e) => inputHandler(e)}
                            />
                        </div>
                    </> : <>
                    <div className="resetInput">
                        <div>New Password ▶</div>
                        <input 
                        className="resetInputPass"
                        type="text"
                        name="newPassword"
                        value={passwords.newPassword}
                        placeholder="New Password"
                        onChange={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="resetInput">
                        <div>Confirm Password ▶</div>
                        <input 
                        className="resetInputPass"
                        type="text"
                        name="newPasswordConfirm"
                        value={passwords.newPasswordConfirm}
                        placeholder="Confirm Password"
                        onChange={(e) => inputHandler(e)}
                        />
                    </div>
                    </>
                    }
                    
                </form>
                {errorItem && (
                    <div className="resetErrorCon">
                        <div>{errorItem}</div>
                    </div>
                )}
                {isShow ? 
                <div className="resetBtn" onClick={showHandler}>SHOW PASSWORD</div> : 
                <div className="resetBtn" onClick={showHandler}>HIDE PASSWORD</div>}
                <div className="resetBtn" onClick={resetHandler}>RESET NOW</div>
            </div>
        </div>
    )
}

export default ResetPage
