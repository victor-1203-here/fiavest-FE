import React, {useState, useEffect, useRef} from 'react'
import api from '../api/api';
import testApi from '../api/test-api';
import Datalist from '../components/Post/datalist'
import Navbar from '../components/navbar'
import '../styles/page.css'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/scrollToTop';

function Posting() {

    const [posting, setPosting] = useState([])
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const inputElement = useRef("")
    // const [test, setTest] = useState([])

    // Retrieve from JSON
    const retrieveList = async () => {
        const responce = await api.get("/posts");
        return responce.data;
    };

    // Test

    // const test = async () => {
    //     console.log("test");
    //     const sessionID = localStorage.getItem("SessionID");
    //     await testApi.get("/private/user/get-user-details", {headers: {'sessionId':sessionID}}).then(
    //         resp => {
    //             console.log(resp);
    //         }
    //     ).catch(function(error) {
    //         if (error.response) {
    //             console.log(error.response.data);
    //             console.log(error.response.data.error.message);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //         } else if (error.request) {
    //             console.log(error.request);
    //         } else {
    //             console.log('Error', error.message)
    //         }
    //     })
    // }

    // End Test

    const SearchHandler = () => {
        // console.log(inputElement.current.value);
        const input = inputElement.current.value
        setSearch(input);
        if (input !== "") {
            const newPostList = posting.filter((post) => {
                return Object.values(post).join(" ").toLowerCase().includes(input.toLowerCase());
            });
            setSearchResult(newPostList);
        } else {
            setSearchResult(posting)
        }
    }

    useEffect(() => {
        const getAllPost = async () => {
            const allPost = await retrieveList();
            if(allPost) setPosting(allPost)
        };
        getAllPost();
    }, [])

    return (
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addPost"} className="addBtn">ADD NEW POST</Link>
                <div className="searchCon">
                    <input 
                    ref={inputElement}
                    className="searchBox" 
                    type="text" 
                    name="" 
                    value={search} 
                    onChange={SearchHandler}
                    placeholder="Search Here..." />
                </div>
            </div>
            <div className="TitleCon">
                <div className="mainTitle">
                    <div className="TitleText" style={{width: '15%'}}>Title</div>
                    <div className="TitleText" style={{width: '25%'}}>Body</div>
                    <div className="TitleText" style={{width: '10%'}}>Image Filename</div>
                    <div className="TitleText" style={{width: '40%'}}>Content URL</div>
                    <div className="TitleText" style={{width: '10%'}}>Created by</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            <Datalist posting={search.length < 1 ?  posting : searchResult}
            key={posting.id} />
            <ScrollToTop />
        </div>
    )
}

export default Posting
