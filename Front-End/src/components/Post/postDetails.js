import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/component.css'
import '../../styles/postDetail.css'
import ReactPlayer from 'react-player'

const PostDetails = (props) => {

    // console.log(props.location.state.posting);
    const { url, title, body, img, postedOn } = props.location.state.posting;

    var date = postedOn.substr(0,10);
    // console.log(img);

    return (
        <div className="mainDetails">
            <h2>If content preview did not show "No Preview Available", Try reload this page by F5</h2>
            <div className="Combine1">
                <div className="content">
                    <div className="postLabel" style={{marginBottom: '10px'}} >- Content Preview -</div>
                    {/* If got 'youtube' in url then display youtube video */}
                    {(url.includes("yout") === true) ? 
                    <div className="postCon">
                        <ReactPlayer url={url} controls />
                    </div> : 
                    (url.includes("facebook") === true) ? 
                        (url.includes("videos") === true) ?
                        <div class="fb-video"
                        data-href={url}
                        data-width="410"
                        data-show-caption="true"
                        data-allowfullscreen="true">
                        </div> :
                        <div className="fb-post" 
                        data-href={url}
                        data-show-text="false"
                        data-width="400">
                        </div> : 
                    <div className="noPreview">
                        No Preview Available...
                    </div>
                    }
                </div>
                <div className="content">
                    <div className="postLabel" style={{marginBottom: '10px'}} >- Post Image -</div>
                    <img className="postImg" src={`data:image/jpeg;base64,${img}`} alt="post" />
                </div>
            </div>
            <div className="postDetailCon">
                <div className="postLabel" >Content URL: </div>
                <a href={url} rel="noreferrer" target="_blank" style={{textDecoration: 'none'}} className="postItem" >{url}</a>
            </div>
            <div className="postDetailCon">
                <div className="postLabel" >Post Title : </div>
                <div className="postItem" >{title}</div>
            </div>
            <div className="postDetailCon">
                <div className="postLabel" >Post Body : </div>
                <div className="postItem" >{body}</div>
            </div>
            <div className="postDetailCon">
                <div className="postLabel" >Created when : </div>
                <div className="postItem" >{date}</div>
            </div>
            <Link to={'/posting'}>
                <button className="backBtn">BACK TO POST</button>
            </Link>
        </div>
    )
}

export default PostDetails
