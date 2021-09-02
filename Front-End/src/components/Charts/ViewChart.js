import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'

const ViewChart = (props) => {

    const {chartDate, lineImg, lineName, pieImg, pieName} = props.location.state.chart
    var date = chartDate.substr(0, 10);
    
    return (
        <div className="mainViewChart">
            <div className="ViewChartHeader">
                <div className="ViewChartDate">Chart on {date}</div>
                <Link to={'/charts'}>
                <button className="backBtn">BACK TO CHARTS</button>
            </Link>
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
    )
}

export default ViewChart
