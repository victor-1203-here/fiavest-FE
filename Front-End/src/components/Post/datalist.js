import React from 'react'
import '../../styles/component.css'
import DataCard from './dataCard'

const Datalist = (props) => {
    
    // console.log(props.posting);
    const renderList = props.posting.map((post) => {
        // console.log(post);
        return (
            <DataCard key={post.postingId} post={post} />
        )
    })

    return (
        <div>{renderList.length > 0 ? renderList : <div className="None">No Posting ...</div> }</div>
    )
}

export default Datalist
