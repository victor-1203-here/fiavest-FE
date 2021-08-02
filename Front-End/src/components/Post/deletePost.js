import React from 'react'
import testApi from '../../api/test-api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'

const DeletePost = (props) => {

    const {postingId, url, title, body, imgFileName, postedOn} = props.location.state.posting;
    // console.log(props.location.state.posting);

    var date = postedOn.substr(0,10);

    const DeleteHandler = async (e) => {
        e.preventDefault()
        if (window.confirm(`This post will delete PERMANENTLY !`)) {
            const sessionID = localStorage.getItem("SessionID");
            await testApi.post("/private/postings/delete-postings", postingId, {headers: {'sessionId':sessionID}}).then(
                resp => {
                    // props.history.goBack()
                    console.log(resp.data);
                }
            ).catch(function(err) {
                if (err.response) {
                    if(err.response.data.error.message === "Session expired") {
                        alert("Session Expired, Please Login Again")
                        localStorage.clear();
                        window.location.pathname = "/login"
                    }
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log('Error', err.message);
                }
            })
        } else {
            return
        }
    }

    return (
        <div className="deleteCon">
            <div className="topTitle">- Delete this Post ? -</div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Content URL : </div>
                <div className="deleteInfo">{url}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Image File Name : </div>
                <div className="deleteInfo">{imgFileName}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Title : </div>
                <div className="deleteInfo">{title}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Body : </div>
                <div className="deleteInfo">{body}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Created when : </div>
                <div className="deleteInfo">{date}</div>
            </div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={DeleteHandler} >DELETE</button>
                <Link to={'/posting'}>
                    <button className="cancelBtn">CANCEL</button>
                </Link>
            </div>
        </div>
    )
}

export default DeletePost
