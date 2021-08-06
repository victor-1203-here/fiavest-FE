import React from 'react'
import '../styles/component.css'

const PageButton = (props) => {

    return (
        <div className="PageGuideCon">

            {(props.pageNum === 1) ?  <div /> : <div className="pageGuideBtn" onClick={props.onPrev} ><i style={{fontSize: '20px', marginRight: "10px"}}className='far fa-arrow-alt-circle-left'></i>PREV</div>}
            
            <div className="pageNum">{props.pageNum}</div>

            {(props.arrayLength < 49) ? <div /> : <div className="pageGuideBtn" onClick={props.onNext} >NEXT<i style={{fontSize: '20px', marginLeft: "10px"}}className='far fa-arrow-alt-circle-right'></i></div> }
            {/* <div className="pageGuideBtn" onClick={props.onNext} >NEXT<i style={{fontSize: '20px', marginLeft: "10px"}}className='far fa-arrow-alt-circle-right'></i></div> */}
        </div>
    )
}

export default PageButton
