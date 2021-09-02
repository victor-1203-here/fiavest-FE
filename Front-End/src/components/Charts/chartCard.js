import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/component.css'

const ChartCard = (props) => {

    // console.log(props.charts);
    const {pieName, chartId, lineName, chartDate} = props.charts

    var date = chartDate.substr(0, 10);

    return (
        <div className="list">
            <div className="listContent">
                <div className="listItem" style={{width: '30%'}}>{pieName}</div>
                <div className="listItem" style={{width: '30%'}}>{lineName}</div>
                <div className="listItem" style={{width: '40%'}}>{date}</div>
            </div>
            <div className="listBtn">
                <Link to={{pathname:`/viewChart/${chartId}`, state:{chart: props.charts}}}>
                    <button className="smallButton">DETAILS</button>
                </Link>
                <Link to={{pathname: `/deleteChart/${chartId}`, state:{chart: props.charts}}}>
                    <button className="smallButton">DELETE</button>
                </Link>
            </div>
        </div>
    )
}

export default ChartCard
