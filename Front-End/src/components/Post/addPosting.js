import React, { useState, useRef } from 'react'
import { uuid } from 'uuidv4';
import api from '../../api/api';
import '../../styles/component.css'

const AddPosting = (props) => {

    const today = new Date();
    var todayDate = today.getFullYear()+'-'+('0' + (today.getMonth()+1))+'-'+today.getDate();
    // const name = "test";
    // const encode = btoa(name);
    // console.log(encode);

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
            // Add custom ID for new post. Remove line 32 for not provide ID when add new
            const request = {id: uuid(), image64, fileName , ...info}
            // console.log(request);
            await api.post("/posts", request).then(
                resp => {
                    // console.log(resp)
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
