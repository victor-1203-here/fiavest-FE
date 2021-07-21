import React from 'react'
import '../../styles/component.css'
import DataCard from './dataCard'

const Datalist = (props) => {

    const renderList = props.posting.map((post) => {
        return (
            <DataCard post={post} />
        )
    })

    return (
        <div>{renderList.length > 0 ? renderList : <div className="None">Loading List ...</div> }</div>
    )
}

export default Datalist
