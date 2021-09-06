import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ImageList from '../components/ImagesSwipe/imageList'
import Navbar from '../components/navbar'
import '../styles/page.css'
import ScrollToTop from '../components/scrollToTop';
import NewIndicator from '../components/loading';
import realApi from '../api/test-api';

const ImageSwiper = () => {

    const [images, setImages] = useState([])
    const [isShow, setIsShow] = useState(false)

    const retriveImages = async () => {
        setIsShow(true)
        const responce = await realApi.get("/public/slideshow-ads/fetch");
        // console.log(responce.data.data)
        setIsShow(false)
        return responce.data.data;
    };

    useEffect(() => {
        const getAllImages = async () => {
            const allImage = await retriveImages();
            if(allImage) setImages(allImage)
        };
        getAllImages();
    }, [])

    return (
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addImage"} className="addBtn">ADD NEW IMAGE</Link>
            </div>
            <div className="TitleCon">
                <div className="mainTitle">
                    <div className="TitleText" style={{width: '100%'}}>Image Filename</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            {isShow ? <NewIndicator /> :
            <>
                <ImageList image={images} />
                <ScrollToTop />
            </> }
        </div>
    )
}

export default ImageSwiper
