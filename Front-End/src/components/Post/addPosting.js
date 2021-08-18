import React, { useState, useRef } from 'react'
import { uuid } from 'uuidv4';
import testApi from '../../api/test-api';
import '../../styles/component.css'
import InputCom from '../inputCom';

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

    const [errorItem, setErrorItem] = useState("")
    const [logoutError, setLogoutError] = useState("")

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
            setErrorItem("FILE OVER 1MB")
            setFileName("OVER LIMIT...")
            setImage64("")
        } else {
            setFileName(e.target.files[0].name)
            encodeFile(e.target.files[0])
            setErrorItem("")
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
                // console.log('Error : ', err);
                setErrorItem(err)
            };
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        if (info.url === "" || info.date === "" || info.title === "" || info.body === "" || image64 === "" ) {
            // alert("Please make sure all has been filled !");
            setErrorItem("Empty Field Detected !")
        } else {
        // Put 'filename' in {} to pass filename
            const sessionID = localStorage.getItem("SessionID");
            const request = {img: image64 , uuid: uuid(), imgFileName: fileName,  ...info}
            await testApi.post("/private/postings/add-postings", request, {headers: {'sessionId':sessionID}}).then(
                resp => {
                    props.history.goBack()
                    // console.log(resp.data);
                }
            ).catch(function(err) {
                if (err.response) {
                    setErrorItem(err.response.data.error.message)
                    if(err.response.data.error.message === "Session expired") {
                        setLogoutError("LOGOUT NOW")
                    } else {
                        // console.log(err.response.data.error.message);
                        setErrorItem("Something Wrong, Please Contact IT Department")
                    }
                } else if (err.request) {
                    // console.log(err.request);
                    setErrorItem(err.request)
                } else {
                    // console.log('Error', err.message);
                    setErrorItem(err.message)
                }
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    return (
        <div className="addContainer">
            <form className="addForm" onSubmit={submitHandler}>
                <div className="topTitle">Add New Post</div>
                <InputCom 
                label="Title :"
                type="text"
                name="title"
                value={info.title}
                PHolder="Title"
                onChange={(e) => inputHandler(e)}
                />
                <div className="inputContainer">
                    <label className="label" >Body : </label>
                    <textarea 
                    style={{resize: 'vertical'}}
                    className="inputCon"
                    type="text" 
                    name="body"
                    value={info.body}
                    placeholder="Body Text"
                    // maxLength="30"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="inputContainer">
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
                <InputCom 
                label="URL Link :"
                type="text"
                name="url"
                value={info.url}
                PHolder="URL Link"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Date :"
                type="date"
                name="date"
                value={info.date}
                PHolder="Date"
                onChange={(e) => inputHandler(e)}
                />
                {errorItem && (
                    <div className="errorCon">
                        <div>{errorItem}</div>
                        <div className="logoutText" onClick={logout}>{logoutError}</div>
                    </div>
                )}
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>ADD</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )
}

export default AddPosting
