import React, { useState, useRef } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import testApi from '../../api/test-api';
import '../../styles/component.css'

const AddPosting = (props) => {

    const today = new Date();
    var todayDate = today.toISOString().substr(0,10);

    const [info, setInfo] = useState({ 
        title: "",
        body: "",
        url: "", 
        date: todayDate
    });

    const [image64, setImage64] = useState("")
    const [fileName, setFileName] = useState("No File...")

    const openInput = useRef(null)

    const inputHandler = (e) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const fileHandler = (e) => {
        // Set for only file lower than 1MB
        if (e.target.files[0].size >  1048576) {
            alert("Image over 1MB, please select others");
            setFileName("OVER LIMIT")
            setImage64("")
        } else {
            setFileName(e.target.files[0].name)
            encodeFile(e.target.files[0])
        }
    };

    const encodeFile = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result
                // console.log(Base64);
                setImage64(Base64)
            };
            reader.onerror = (err) => {
                console.log('Error : ', err);
            };
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        if (info.url === "" || info.date === "" || info.title === "" || info.body === "" || image64 === "" ) {
            alert("Please make sure all has been filled !");
            return
        } else {
        // Put 'filename' in {} to pass filename
            const sessionID = localStorage.getItem("SessionID");
            const request = {uuid: uuid(), img: image64 , imgFileName: fileName,  ...info}
            // await api.post("/posts", request).then(
            //     resp => {
            //         // console.log(resp)
            //         props.history.goBack()
            //     }
            // )
            await testApi.post("/private/postings/add-postings", request, {headers: {'sessionId':sessionID}}).then(
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
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
                <div className="topTitle">Add New Post</div>
                <div className="addCon">
                    <label className="label" >Title : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="title"
                    value={info.title}
                    placeholder="Title Text"
                    maxLength="15"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Body : </label>
                    <textarea 
                    className="inputCon"
                    type="text" 
                    name="body"
                    value={info.body}
                    placeholder="Body Text"
                    maxLength="30"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Image File : </label>
                    <div className="uploadCon">
                        <input
                        ref={openInput} 
                        style={{display: 'none'}}
                        type="file"
                        accept="image/*"
                        onChange={fileHandler}
                        />
                        <div className="addImgBtn" onClick={() => {openInput.current.click()}}>UPLOAD IMAGE</div>
                        <div style={{marginTop: '10px'}}>{fileName}</div>
                    </div>
                </div>
                <div className="addCon">
                    <label className="label" >URL Link : </label>
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
                <button className="cancelBtn" onClick={submitHandler}>ADD</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )
}

export default AddPosting
