import React from 'react'
import Dots from "react-activity/dist/Dots"
import 'react-activity/dist/Dots.css'

const NewIndicator = (props) => {
    return (
        <div style={{width: "100%", textAlign: "center", paddingTop: "250px"}}>
            <Dots size="50"/>;
        </div>
    )
};

export default NewIndicator
