import React, { useState } from 'react'
import '../../styles/component.css'
import api from '../../api/api'

const EditPosting = (props) => {

    const {id, title, info, date} = props.location.state.posting

    const [infomation, setInfo] = useState(
        {
         id: id,
         title: title,
         info: info, 
         date: date, 
        }
    )

    // console.log(props.history.goBack)

    const inputHandler = (e) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        await api.put(`/posts/${infomation.id}`, infomation)
        .then(resp => {
            // console.log(resp)
            props.history.goBack()
        })
    }

    return (
        <div className="editContainer">
            <div className="detailsTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
                <div className="addCon">
                    <label className="label" >Title : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="title"
                    value={infomation.title}
                    placeholder="Title"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Information : </label>
                    <textarea 
                    className="inputTextArea"
                    type="text" 
                    name="info"
                    value={infomation.info}
                    placeholder="Information"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Date : </label>
                    <input 
                    className="inputCon"
                    type="date" 
                    name="date"
                    value={infomation.date}
                    placeholder="Date"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <button className="cancelBtn">Save</button>
            </form>
        </div>
    )
}

export default EditPosting
