import React, {useState, useEffect, useRef} from 'react'
import { uuid } from 'uuidv4';
import api from '../api/api';
import testApi from '../api/test-api';
import AddPosting from '../components/Post/addPosting'
import Datalist from '../components/Post/datalist'
import Navbar from '../components/navbar'
import '../styles/page.css'
import { Link } from 'react-router-dom'

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

    // const retrieveTest = async () => {
    //     // const responce = await api.get("/posts");
    //     // return responce.data;
    //     const responce = await testApi.get("/users");
    //     return responce.data
    // };

    // useEffect(() => {
    //     const getAllTest = async () => {
    //         const allTest = await retrieveTest();
    //         if(allTest) setTest(allTest)
    //     };
    //     getAllTest();
    //     console.log(test.data)
    // }, [])

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
                <Link to={"/addPost"} className="addBtn">ADD NEW POST ?</Link>
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
                    <div className="TitleText">Title</div>
                    <div className="TitleText">Information</div>
                    <div className="TitleText">Date</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            <Datalist posting={search.length < 1 ?  posting : searchResult}
            key={posting.id} />
        </div>
    )
}

export default Posting
