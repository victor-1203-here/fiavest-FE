import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'
import DeleteModal from '../deleteModal'
import api from '../../api/test-api'
// import api from '../../api/api'

const DeleteChart = (props) => {

    const {chartDate, lineImg, lineName, pieImg, pieName, chartId} = props.location.state.chart
    var date = chartDate.substr(0, 10);

    const [showModal, setShowModal] = useState(false)

    const DeleteHandler = async(e) => {
        e.preventDefault()
        const sessionID = localStorage.getItem("SessionID");
        await api.post("/private/ema5/remove", {chartId: chartId}, {headers: {'sessionId':sessionID}}).then(
            resp => {
                props.history.goBack()
                // console.log(resp.data);
            }
        ).catch(function(err) {
            if (err.response) {
                console.log(err.response);
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
    
    const OpenModal = () => {
        setShowModal(true)
    }

    const CloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
        <div className="mainViewChart">
            <div className="ViewChartHeader">
                <div className="ViewChartDate">Delete Chart on {date} ?</div>
                <div className="ViewChartButtonCon">
                    <button className="backBtn" style={{backgroundColor: "red", border: "none", color: "white", fontWeight: "bold"}} onClick={OpenModal} >DELETE CHART</button>
                    <Link to={'/charts'}>
                        <button className="backBtn">BACK TO CHARTS</button>
                    </Link>
                </div>
                
            </div>
            <div className="BothChartCon">
                <div className="ChartImageContainer">
                    <div className="ViewChartText" style={{fontSize: "xx-large"}}>Pie Chart</div>
                    <img className="ChartImages" src={`data:image/jpeg;base64,${pieImg}`} alt="Pie" />
                    <div className="ViewChartText">Pie Title ▶ {pieName}</div>
                </div>
                <div className="ChartImageContainer">
                    <div className="ViewChartText" style={{fontSize: "xx-large"}}>Line Chart</div>
                    <img className="ChartImages" src={`data:image/jpeg;base64,${lineImg}`} alt="Line" />
                    <div className="ViewChartText">Line Title ▶ {lineName}</div>
                </div>
            </div>
        </div>
        <DeleteModal
            showModal={showModal}
            closeModal={CloseModal}
            type="chart"
            onDelete={DeleteHandler}
            onCloseModal={CloseModal}
            />
        </>
    )
}

export default DeleteChart
