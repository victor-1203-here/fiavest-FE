import React from 'react'
import '../../styles/component.css'
import ImageCard from './imageCard'

const ImageList = (props) => {

    // console.log(props.image);
    const renderImages = props.image.map((images) => {
        // console.log(images);
        return (
            <ImageCard key={images.adId} image={images}/>
        )
    })
    
    return (
        <div>{renderImages.length > 0 ? renderImages : <div className="None">No Image...</div>}</div>
    )
}

export default ImageList
