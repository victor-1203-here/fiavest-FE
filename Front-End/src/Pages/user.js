import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/navbar'
import UserList from '../components/Users/userList'
import '../styles/page.css'
import api from '../api/api'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/scrollToTop'

function User() {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([]);
    const inputElement = useRef("")

    const retriveUser = async () => {
        const responce = await api.get("/users");
        // console.log(responce.data)
        return responce.data;
        // For get User, First check forEach() is responce.data having Activation Code or not. If yes, wont add into it; Else, add into it
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

    useEffect(() => {
        const getAllUser = async () => {
            const allUser = await retriveUser();
            if(allUser) setUsers(allUser)
        };
        getAllUser();
    }, [])

    return(
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addUser"} className="addBtn">ADD NEW USER ?</Link>
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
            <UserList users={search.length < 1 ?  users : searchResult}
            key={users.id} />
            <ScrollToTop />
        </div>
    )
}

export default User
