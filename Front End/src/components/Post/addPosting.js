import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import '../../styles/component.css'

const AddPosting = (props) => {

    const [info, setInfo] = useState({title: "", info: "", date: ""})

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
        if (info.title === "" || info.info === "" || info.date === "") {
            alert("Please make sure all has been filled !");
            return
        } else {
            const request = {id: uuid(), ...info}
            await api.post("/posts", request).then(
                resp => {
                    console.log(resp)
                    props.history.goBack()
                }
            )
        }
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
                <div className="formTitle">Add New Post</div>
                <div className="addCon">
                    <label className="label" >Title : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="title"
                    value={info.title}
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
                    value={info.info}
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
                    value={info.date}
                    placeholder="Date"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <button className="addNewBtn">Add</button>
            </form>
            <button className="cancelBtn" onClick={() => props.history.goBack()} >Cancel</button>
        </div>
    )
}

export default AddPosting
