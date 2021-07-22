import React from 'react'
import api from '../../api/api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'

const DeletePost = (props) => {

    const {id, url, date} = props.location.state.posting;

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
            <div className="detailsTitle">! Delete this Post ? !</div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">URL Link : </div>
                <div className="deleteInfo">{url}</div>
            </div>
            <div className="deleteDetailCon">
                <div className="deleteDetails">Created when : </div>
                <div className="deleteInfo">{date}</div>
            </div>
            <div className="BtnCon">
                <button className="deleteBtn" onClick={DeleteHandler} >Delete</button>
                <Link to={'/posting'}>
                    <button className="cancelBtn">Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default DeletePost
