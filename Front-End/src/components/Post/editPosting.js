import React, { useState, useRef } from 'react'
import '../../styles/component.css'
import api from '../../api/api'

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
                console.log('Error : ', err);
            };
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault()
        if (infomation.url === "" || infomation.date === "" || infomation.title === "" || infomation.body === "" || img === "" ) {
            alert("Empty Input Detected !");
            return
        } else {
            // await api.put(`/posts/${infomation.postingId}`, infomation)
            // .then(resp => {
            //     // console.log(resp)
            //     props.history.goBack()
            // })
            props.history.goBack()
        }
    }

    return (
        <div className="editContainer">
            <div className="topTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
            <div className="addCon">
                    <label className="label" >Title : </label>
                    <input 
                    className="inputCon"
                    type="text" 
                    name="title"
                    value={infomation.title}
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
                    value={infomation.body}
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
                        <div style={{marginTop: '10px'}}>{infomation.imgFileName}</div>
                    </div>
                </div>
                <div className="addCon">
                    <label className="label" >URL Link : </label>
                    <textarea 
                    className="inputTextArea"
                    type="text" 
                    name="url"
                    value={infomation.url}
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
                    value={infomation.date}
                    placeholder="Date"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
            </form>
            <div className="BtnCon">
                <button className="cancelBtn" onClick={submitHandler}>SAVE</button>
                <button className="cancelBtn" onClick={() => props.history.goBack()} >CANCEL</button>
            </div>
        </div>
    )
}

export default EditPosting
