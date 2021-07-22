import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'
import ReactPlayer from 'react-player'

const PostDetails = (props) => {

    const { url, date } = props.location.state.posting;
    
    return (
        <div className="mainDetails">
            <div className="CombineCon" >
                <>
                    {/* If got 'youtube' in url then display youtube video */}
                    {url.includes("youtube") === true ? 
                    <div className="postCon">
                        <ReactPlayer url={url} controls />
                    </div> : 
                    // For facebook url
                    url.includes("videos") === true ?
                    <div class="fb-video"
                    data-href={url}
                    data-width="600"
                    data-show-caption="true"
                    data-allowfullscreen="true">
                    </div> :
                    <div className="fb-post" 
                    data-href={url}
                    data-show-text="true"
                    data-width="600"></div>
                    }
                </>
                <div style={{width: "50%", textAlign: 'center'}}>
                    <div className="detailCon">
                        <div style={{fontFamily: 'Raleway', fontSize: '30px'}}>URL Link : </div>
                        <a href={url} target="_blank" style={{textAlign: 'center', width: '60%', textDecoration: 'none'}} >{url}</a>
                    </div>
                    <div className="detailCon">
                        <div style={{fontFamily: 'Raleway', fontSize: '30px'}}>Created when : </div>
                        <div style={{textAlign: 'center', width: '60%'}} >{date}</div>
                    </div>
                    <Link to={'/posting'}>
                        <button className="cancelBtn">Back to Post</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostDetails
