import React, {useState} from 'react'
import testApi from '../../api/test-api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'
import DeleteModal from '../deleteModal'

const DeletePost = (props) => {

    const [showModal, setShowModal] = useState(false)
    const {postingId, url, title, body, imgFileName, postedOn} = props.location.state.posting;
    // console.log(props.location.state.posting);

    var date = postedOn.substr(0,10);

    const DeleteHandler = async (e) => {
        e.preventDefault()
        const sessionID = localStorage.getItem("SessionID");
        await testApi.post("/private/postings/delete-postings", {postingId: postingId}, {headers: {'sessionId':sessionID}}).then(
            resp => {
                props.history.goBack()
                // console.log(resp.data);
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
    }

    const OpenModal = () => {
        setShowModal(true)
    }

    const CloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
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
                    <button className="deleteBtn" onClick={OpenModal} >DELETE</button>
                    <Link to={'/posting'}>
                        <button className="cancelBtn">CANCEL</button>
                    </Link>
                </div>
            </div>
            <DeleteModal 
            showModal={showModal}
            closeModal={CloseModal}
            type="posting"
            onDelete={DeleteHandler}
            onCloseModal={CloseModal}
            />
        </>
    )
}

export default DeletePost
