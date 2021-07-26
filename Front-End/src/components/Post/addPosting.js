import React, { useState } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import '../../styles/component.css'

const AddPosting = (props) => {

    const today = new Date();
    var date1 = today.getFullYear()+'-'+('0' + (today.getMonth()+1))+'-'+today.getDate();

    const [info, setInfo] = useState({ 
        url: "", 
        date: date1
    })

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
        if (info.url === "" || info.date === "") {
            alert("Please make sure all has been filled !");
            return
        } else {
            // Add custom ID for new post. Remove line 32 for not provide ID when add new
            const request = {id: uuid(), ...info}
            await api.post("/posts", request).then(
                resp => {
                    console.log(resp)
                    props.history.goBack()
                }
            )
            // await testApi.post("/register/new-via-email", info).then(
            //     resp => {
            //         console.log(resp)
            //         props.history.goBack()
            //     }).catch(function (error) {
            //         if (error.response) {
            //             console.log(error.response.data);
            //             console.log(error.response.status);
            //             console.log(error.response.headers);
            //         } else if (error.request) {
            //             console.log(error.request);
            //         } else {
            //             console.log('Error', error.message);
            //         }
            // })
        }
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
                <div className="formTitle">Add New Post</div>
                <div className="addCon">
                    <label className="label" >URK Link : </label>
                    <textarea 
                    className="inputTextArea"
                    type="text" 
                    name="url"
                    value={info.url}
                    placeholder="URL Link"
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
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>Add</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >Cancel</button>
            </div>
        </div>
    )
}

export default AddPosting
