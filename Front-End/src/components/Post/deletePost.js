import React from 'react'
import api from '../../api/api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'

const DeletePost = (props) => {

    const {id, url, title, body, fileName, date} = props.location.state.posting;

    const DeleteHandler = async (e) => {
        e.preventDefault()
        if (window.confirm(`This post will delete PERMANENTLY !`)) {
            await api.delete(`/posts/${id}`).then(resp => {
                props.history.goBack()
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
                <div className="deleteDetails">Image Filename : </div>
                <div className="deleteInfo">{fileName}</div>
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
