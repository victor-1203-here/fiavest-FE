import React from 'react'
import api from '../../api/api'
import '../../styles/component.css'
import { Link } from 'react-router-dom'

const DeletePost = (props) => {

    const {id, title, info, date} = props.location.state.posting;

    const DeleteHandler = async (e) => {
        e.preventDefault()
        if (window.confirm(`The ${title} post will delete PERMANENTLY !`)) {
            await api.delete(`/posts/${id}`).then(resp => {
                props.history.goBack()
            })
        } else {
            return
        }
    }

    return (
        <div className="deleteCon">
            <div className="detailsTitle">! Delete <span style={{color: 'red'}}>{title}</span> Post ? !</div>
            <div className="deleteTitle">↓ {title} Post ↓</div>
            <div className="detailCon">
                <div className="deleteDetails">Title : </div>
                <div className="deleteInfo">{title}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Information : </div>
                <div className="deleteInfo">{info}</div>
            </div>
            <div className="detailCon">
                <div className="deleteDetails">Date : </div>
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
