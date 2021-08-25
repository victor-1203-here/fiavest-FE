import React, {useState, useRef} from 'react'
import { uuid } from 'uuidv4';
import realApi from '../../api/test-api';
import '../../styles/component.css'
import PreviewImg from '../../img/preview.png'
import api from '../../api/api';

const AddImage = (props) => {

    const [img64, setImg64] = useState("")
    const [fileName, setFileName] = useState("No File Been Selected...")

    const [errorMessage, setErrorMessage] = useState("")
    const openInput = useRef(null)

    const fileHandler = (e) => {
        // Set for only file lower than 1MB
        console.log(e.target.files[0]);
        if (e.target.files[0].size >  1048576) {
            setErrorMessage("FILE OVER 1MB")
            setFileName("Over Limit")
            setImg64("")
        } else {
            setFileName(e.target.files[0].name)
            encodeFile(e.target.files[0])
            setErrorMessage("")
        }
    };

    const encodeFile = (file) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result
                console.log(Base64);
                setImg64(Base64)
            };
            reader.onerror = (err) => {
                // console.log('Error : ', err);
                setErrorMessage(err)
            };
        }
    };

    const uploadHandler = async (e) => {
        e.preventDefault()
        const sessionID = localStorage.getItem("SessionID");
        const request = {id: uuid(), fileName: fileName, base64: img64}
        await api.post("/images", request).then(
            resp => {
                console.log(resp);
                props.history.goBack()
            }
        )
        // Action
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    return (
        <div className="imgSwipeCon">
            <div className="imgSwipeSelect">
                <label className="imgSwipeLabel" >Upload Image Here</label>
                <div className="imgUploadCon">
                    <input
                    ref={openInput} 
                    style={{display: 'none'}}
                    type="file"
                    accept="image/jpeg"
                    onChange={fileHandler}
                    />
                    <div className="imgUploadBtn" onClick={() => {openInput.current.click()}}>UPLOAD IMAGE</div>
                    <div style={{marginTop: '10px', marginBottom: "10px"}}>{fileName}</div>
                    {errorMessage && (
                        <div className="errorCon">
                            <div>{errorMessage}</div>
                            {/* <div className="logoutText" onClick={logout}>{logoutError}</div> */}
                        </div>
                    )}
                    {img64 && (
                        <div className="uploadBtn" onClick={uploadHandler}>
                            UPLOAD NOW
                        </div>
                    )}
                </div>
            </div>
            <div className="imgPreviewCon">
                <div className="imgSwipeLabel">Image Preview Here</div>
                {img64 === "" ? (
                    <img className="imgPreview" src={PreviewImg} alt="post" />
                )  : (
                    <img className="imgPreview" src={img64} alt="post" />
                )}
                
            </div>
        </div>
    )
}

export default AddImage
