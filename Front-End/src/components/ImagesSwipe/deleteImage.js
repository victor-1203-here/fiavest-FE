import React,{useState} from 'react'
import '../../styles/component.css'
import { Link } from 'react-router-dom'
import DeleteModal from '../deleteModal'
import realApi from '../../api/test-api'

const DeleteImage = (props) => {

    const [showModal, setShowModal] = useState(false)
    const {imgFileName, img, adId} = props.location.state.image

    const DeleteHandler = async(e) => {
        e.preventDefault()
        const sessionID = localStorage.getItem("SessionID");
        await realApi.post("/private/slideshow-ads/remove", {adId: adId}, {headers: {'sessionId':sessionID}}).then(
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
                <div className="topTitle">- Delete this Image ? -</div>
                <div className="deleteDetailCon">
                    <div className="deleteDetails">Image File Name ▶ </div>
                    <div className="deleteInfo">{imgFileName}</div>
                </div>
                <div className="deleteDetailCon">
                    <div className="deleteDetails">Image Preview ▶ </div>
                    <img className="imageDetail" src={`data:image/jpeg;base64,${img}`} alt="post" style={{height: "300px"}} />
                </div>
                <div className="BtnCon">
                <button className="deleteBtn" onClick={OpenModal} >DELETE</button>
                    <Link to={'/imageSwiper'}>
                        <button className="cancelBtn">CANCEL</button>
                    </Link>
                </div>
            </div>
            <DeleteModal
            showModal={showModal}
            closeModal={CloseModal}
            type="image"
            onDelete={DeleteHandler}
            onCloseModal={CloseModal}
            />
        </>
    )
}

export default DeleteImage
