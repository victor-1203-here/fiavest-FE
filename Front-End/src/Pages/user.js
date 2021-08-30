import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/navbar'
import UserList from '../components/Users/userList'
import '../styles/page.css'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/scrollToTop'
import PageButton from '../components/pageButton'
import realApi from '../api/test-api'
import NewIndicator from '../components/loading'

function User() {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([]);
    const inputElement = useRef("")
    const [isShow, setIsShow] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    var pageSize = 50;

    const retriveUser = async () => {
        setIsShow(true)
        var sessionID = localStorage.getItem("SessionID");
        const responce = await realApi.get(`/private/users?role=user&pageSize=${pageSize}&page=${currentPage}`, {headers: {'sessionId': sessionID}}).catch(function(err) {
            // console.log(err.response.data);
            if(err.response.data.error.message === "Session expired") {
                alert("Session Expired, Please Login Again")
                localStorage.clear();
                window.location.pathname = "/login"
            } else {
                alert(err.response.data.error.message)
            }
        })
        setIsShow(false)
        // console.log(responce.data.data);
        return responce.data.data
    };

    const SearchHandler = () => {
        // console.log(inputElement.current.value);
        const input = inputElement.current.value
        setSearch(input);
        if (input !== "") {
            const newUserList = users.filter((user) => {
                return Object.values(user).join(" ").toLowerCase().includes(input.toLowerCase());
            });
            setSearchResult(newUserList);
        } else {
            setSearchResult(users)
        }
    }

    const prevPage = () => {
        let newValue = currentPage - 1
        setCurrentPage(newValue)
    }

    const nextPage = () => {
        let newValue = currentPage + 1
        setCurrentPage(newValue)
    }

    useEffect(() => {
        const getAllUser = async () => {
            const allUser = await retriveUser();
            if(allUser) setUsers(allUser)
        };
        getAllUser();
    }, [currentPage])

    return(
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addUser"} className="addBtn">ADD NEW USER</Link>
                <div className="searchCon">
                    <input 
                    ref={inputElement}
                    className="searchBox" 
                    type="text" 
                    name="" 
                    value={search} 
                    onChange={SearchHandler}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'Search Here...'}
                    placeholder="Search Here..." />
                </div>
            </div>
            
            <div className="TitleCon">
                <div className="mainTitle">
                    <div className="TitleText">Name</div>
                    <div className="TitleText">Broking House</div>
                    <div className="TitleText">Phone Num</div>
                    <div className="TitleText">Address(State)</div>
                    <div className="TitleText">Investment Term</div>
                    <div className="TitleText">Trading Exp</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            {isShow ? <NewIndicator /> : <>
                <UserList users={search.length < 1 ?  users : searchResult} key={users.uuid} />
                <ScrollToTop />
                <PageButton pageNum={currentPage} arrayLength={users.length} onPrev={prevPage} onNext={nextPage} />
            </>}
        </div>
    )
}

export default User
