import React,{useState} from 'react'
import '../../styles/component.css'
import { Link } from 'react-router-dom'
import DeleteModal from '../deleteModal'
import api from '../../api/api'

const DeleteImage = (props) => {

    const [showModal, setShowModal] = useState(false)
    const {fileName, base64, id} = props.location.state.image

    const DeleteHandler = async(e) => {
        e.preventDefault()
        await api.delete(`/images/${id}`).then(
            resp => {
                console.log(resp);
                props.history.goBack()
            }
        )
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
                    <div className="deleteDetails">Image File Name : </div>
                    <div className="deleteInfo">{fileName}</div>
                </div>
                <div className="deleteDetailCon">
                    <div className="deleteDetails">Image Preview : </div>
                    <img className="imageDetail" src={base64} alt="post" style={{height: "300px"}} />
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
