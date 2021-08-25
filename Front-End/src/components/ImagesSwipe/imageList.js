import React from 'react'
import '../../styles/component.css'
import ImageCard from './imageCard'

const ImageList = (props) => {

    const renderList = props.image.map((image) => {
        return (
            <ImageCard image={image} />
        )
    })

    return (
        <div>{renderList.length > 0 ? renderList : <div className="None">No Image...</div>}</div>
    )
}

export default ImageList
