import React from 'react'
import '../../styles/component.css'
import ChartCard from './chartCard'

const ChartList = (props) => {

    const renderCharts = props.charts.map((chart) => {
        // console.log(chart);
        return (
            <ChartCard key={chart.chartId} charts={chart} />
        )
    })

    return (
        <div>
            {renderCharts.length > 0 ? renderCharts : <div className="None">No Charts ...</div>}
        </div>
    )
}

export default ChartList
