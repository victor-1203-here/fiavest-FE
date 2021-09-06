import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/page.css'
import ScrollToTop from '../components/scrollToTop'
import NewIndicator from '../components/loading'
import ChartList from '../components/Charts/chartList'
import api from '../api/test-api'
// import api from '../api/api'

const EmaChart = () => {

    const [Charts, setCharts] = useState([])
    const [isShow, setIsShow] = useState(false)

    const today = new Date();
    const tmr = new Date(today)
    tmr.setDate(tmr.getDate() + 1)
    var date = today.toISOString();
    // console.log(tmr.toISOString());

    const retriveCharts = async() => {
        setIsShow(true)
        // const resp = await api.get('/public/ema5/fetch')
        const resp = await api.get('/public/ema5/fetch')
        setIsShow(false)
        console.log(resp);
        return resp.data
    }

    useEffect(() => {
        const getAllCharts = async () => {
            const allChart = await retriveCharts();
            if(allChart) setCharts(allChart)
        };
        getAllCharts();
    }, [])

    return (
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addCharts"} className="addBtn">ADD NEW CHART</Link>
            </div>
            <div className="TitleCon">
                <div className="mainTitle">
                    <div className="TitleText" style={{width: '30%'}}>Pie Chart Name</div>
                    <div className="TitleText" style={{width: '30%'}}>Line Chart Name</div>
                    <div className="TitleText" style={{width: '40%'}}>Date</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            {isShow ? <NewIndicator /> :
            <>
                <ChartList charts={Charts} />
                <ScrollToTop />
            </> }
        </div>
    
    )
}

export default EmaChart;