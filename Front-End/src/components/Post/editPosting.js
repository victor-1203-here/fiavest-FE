import React, { useState, useRef } from 'react'
import '../../styles/component.css'
import testApi from '../../api/test-api';
import InputCom from '../inputCom';

const EditPosting = (props) => {

    const {postingId, url, title, body, img, imgFileName, postedOn} = props.location.state.posting;
    // console.log(props.location.state.posting);

    var date = postedOn.substr(0,10);

    const [infomation, setInfo] = useState(
        {
         postingId: postingId,
         url: url, 
         title: title,
         body: body,
         img: img,
         imgFileName: imgFileName,
         date: date, 
        }
    )

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
            // alert("Image over 1MB, please select others");
            setErrorItem("FILE OVER 1MB")
        } else {
            // let newCopy = JSON.parse(JSON.stringify(infomation))
            // newCopy.imgFileName = e.target.files[0].name;
            setInfo((oldState) => {
                return{
                    ...oldState, 
                    imgFileName: e.target.files[0].name,
                };
            })
            // setEditimgFileName(e.target.files[0].name)
            encodeFile(e.target.files[0])
        }
    };

    const encodeFile = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result
                setInfo((oriState) => {
                    return{
                        ...oriState,
                        img: Base64
                    }
                })
            };
            reader.onerror = (err) => {
                setErrorItem(err)
            };
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault()
        if (infomation.url === "" || infomation.date === "" || infomation.title === "" || infomation.body === "" || img === "" ) {
            // alert("Empty Input Detected !");
            setErrorItem("Detected Empty Field !")
        } else {
            const sessionID = localStorage.getItem("SessionID");
            await testApi.post("/private/postings/add-postings", infomation, {headers: {"sessionId":sessionID}}).then(
                resp => {
                    // console.log(resp);
                    props.history.goBack()
                }
            ).catch(function (err) {
                if (err.response) {
                    setErrorItem(err.response.data.error.message)
                    if(err.response.data.error.message === "Session expired") {
                        setLogoutError("Session Expired, Please Login Again")
                    } else {
                        setErrorItem("Something Wrong, Please Contact IT Department")
                    }
                } else if (err.request) {
                    setErrorItem(err.request)
                    // console.log(err.request);
                } else {
                    setErrorItem(err.message)
                    // console.log('Error', err.message);
                }
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    return (
        <div className="editContainer">
            <div className="topTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
                <InputCom 
                label="Title :"
                type="text"
                name="title"
                value={infomation.title}
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
                    value={infomation.body}
                    placeholder="Body Text"
                    maxLength="30"
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
                        <div style={{marginTop: '10px'}}>{infomation.imgFileName}</div>
                    </div>
                </div>
                
                <InputCom 
                label="URL Link :"
                type="text"
                name="url"
                value={infomation.url}
                PHolder="URL Link"
                onChange={(e) => inputHandler(e)}
                />
                <InputCom 
                label="Date :"
                type="date"
                name="date"
                value={infomation.date}
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
                <button className="cancelBtn" onClick={submitHandler}>SAVE</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )
}

export default EditPosting
