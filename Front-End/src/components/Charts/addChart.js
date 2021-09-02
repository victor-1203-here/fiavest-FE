import React,{useState, useRef} from 'react'
import '../../styles/component.css'
import UploadBackground from '../../img/upload.png'
import api from '../../api/test-api'

const AddChart = (props) => {

    const today = new Date();
    var todayDate = today.toISOString().substr(0,10);

    const [fileInfo, setFileInfo] = useState({
        pieImg: "",
        lineImg: "",
        pieName: "",
        lineName: "",
        date: todayDate
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [logoutError, setLogoutError] = useState("")
    const openInput = useRef(null)
    const openLineInput = useRef(null)

    const FileHandler = (e) => {
        // console.log(e.target.files[0]);
        if (e.target.name === "pieChart") {
            if (e.target.files[0].size >  1048576) {
                setErrorMessage("FILE OVER 1MB")
            } else {
                encodeFile(e.target.files[0], "pie")
                setErrorMessage("")
            }
        } else if (e.target.name === "lineChart") {
            if (e.target.files[0].size >  1048576) {
                setErrorMessage("FILE OVER 1MB")
            } else {
                encodeFile(e.target.files[0], "line")
                setErrorMessage("")
            }
        }
    }

    const encodeFile = (file, type) => {
        var reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var Base64 = reader.result.substr(reader.result.indexOf(",") +1)
                // console.log(type);
                if (type === "pie") {
                    setFileInfo((prev) => {
                        return {
                            ...prev,
                            pieImg: Base64
                        }
                    })
                } else if (type === "line") {
                    setFileInfo((prev) => {
                        return {
                            ...prev,
                            lineImg: Base64
                        }
                    })
                }
            };
            reader.onerror = (err) => {
                // console.log('Error : ', err);
                setErrorMessage(err)
            };
        }
    };

    const uploadHandler = async (e) => {
        e.preventDefault()
        if (fileInfo.lineName === "" || fileInfo.pieName === "") {
            setErrorMessage("Title for each Chart was needed !")
        } else if (fileInfo.lineImg === "" || fileInfo.pieImg === "") {
            setErrorMessage("No Chart Detected")
        } else {
            console.log(fileInfo);
            const sessionID = localStorage.getItem("SessionID");
            await api.post("/private/ema5/add", fileInfo, {headers:{'Content-Type': 'application/json', 'sessionId':sessionID}}).then(
                resp => {
                    // console.log(resp);
                    props.history.goBack()
                }
            ).catch(error => {
                if (error.response) {
                    console.log(error.response.data.error);
                    setErrorMessage(error.response.data.error.message)
                    if(error.response.data.error.message === "Session expired") {
                        setLogoutError("LOGOUT NOW")
                    } else {
                        console.log(error.response.data.error.message);
                        setErrorMessage("Something Wrong, Please Contact IT Department")
                    }
                } else if (error.request) {
                    console.log(error.request);
                    setErrorMessage(error.request)
                } else {
                    console.log('Error', error.message);
                    setErrorMessage(error.message)
                }
            })
        }
    }

    const titleHandler = (e) => {
        setFileInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/login"
    }

    return (
        <div className="addChartMain">
            <div className="addChartCon">
                <div className="addChartInputAndPreview">
                    <input
                    ref={openInput} 
                    style={{display: 'none'}}
                    type="file"
                    accept="image/jpeg"
                    name="pieChart"
                    onChange={FileHandler}
                    />
                    <div className="ChartTitle">PIE CHART</div>
                    {fileInfo.pieImg === "" ? (
                        <img className="ChartPreview" src={UploadBackground} onClick={() => {openInput.current.click()}} alt="Pie"/>
                    ) : (
                        <img className="ChartPreview" src={`data:image/jpeg;base64,${fileInfo.pieImg}`} onClick={() => {openInput.current.click()}} alt="Pie"/>
                    )}
                    <div className="ChartInputContainer">
                        <label className="label" >Pie Chart Title ▶</label>
                        <input 
                        className="inputCon"
                        type="text"
                        name="pieName"
                        value={fileInfo.pieName}
                        placeholder="Pie Chart Title"
                        onChange={(e) => titleHandler(e)}
                        maxLength="20"
                        autoComplete="off"
                        />
                    </div>
                </div>
                <div className="addChartInputAndPreview">
                    <input
                    ref={openLineInput} 
                    style={{display: 'none'}}
                    type="file"
                    accept="image/jpeg"
                    name="lineChart"
                    onChange={FileHandler}
                    />
                    <div className="ChartTitle">LINE CHART</div>
                    {fileInfo.lineImg === "" ? (
                        <img className="ChartPreview" src={UploadBackground} onClick={() => {openLineInput.current.click()}} alt="Line"/>
                    ) : (
                        <img className="ChartPreview" src={`data:image/jpeg;base64,${fileInfo.lineImg}`} onClick={() => {openLineInput.current.click()}} alt="Line"/>
                    )}
                    <div className="ChartInputContainer">
                        <label className="label" >Line Chart Title ▶</label>
                        <input 
                        className="inputCon"
                        type="text"
                        name="lineName"
                        value={fileInfo.lineName}
                        placeholder="Line Chart Title"
                        onChange={(e) => titleHandler(e)}
                        maxLength="20"
                        autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            {errorMessage && (
                <div className="errorCon" style={{padding: "10px 30px", marginTop: "-40px", marginBottom: "20px"}}>
                    <div>{errorMessage}</div>
                    {logoutError && (
                        <div className="logoutText" onClick={logout}>{logoutError}</div>
                    )}
                </div>
            )}
            <div className="uploadBtn" onClick={uploadHandler} style={{width: "15%", marginTop: "0px"}}>UPLOAD NOW</div>
        </div>
        
    )
}

export default AddChart
