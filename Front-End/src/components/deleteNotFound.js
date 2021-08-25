import React, {useState} from 'react'
import testApi from '../api/test-api'
import '../styles/component.css'

const DeleteNotFound = (props) => {
    console.log(props.location.state.uuid);
    const uuid = props.location.state.uuid
    
    // const testId = props.location.state.users.user.uuid
    // console.log(testId);

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

    return (
        <div className="deleteCon" style={{height: "100vh"}}>
            <div className="topTitle">Delete Not Found Account of this ID</div>
            <div className="deleteTitle" style={{marginTop: 16}}>{uuid}</div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={DeleteHandler} >DELETE</button>
            </div>
        </div>
    )

}

export default DeleteNotFound