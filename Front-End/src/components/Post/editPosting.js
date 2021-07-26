import React, { useState } from 'react'
import '../../styles/component.css'
import api from '../../api/api'

const EditPosting = (props) => {

    const {id, url, date} = props.location.state.posting

    const [infomation, setInfo] = useState(
        {
         id: id,
         url: url, 
         date: date, 
        }
    )

    // console.log(props.history.goBack)

    const inputHandler = (e) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        await api.put(`/posts/${infomation.id}`, infomation)
        .then(resp => {
            // console.log(resp)
            props.history.goBack()
        })
        // await testApi.post("/register/new-via-email", info).then(
        //     resp => {
        //         console.log(resp)
        //         props.history.goBack()
        //     }).catch(function (error) {
        //         if (error.response) {
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.request) {
        //             console.log(error.request);
        //         } else {
        //             console.log('Error', error.message);
        //         }
        // })
    }

    return (
        <div className="editContainer">
            <div className="detailsTitle">~ Edit data and save it ~</div>
            <form className="editForm" onSubmit={submitHandler}>
                <div className="addCon">
                    <label className="label" >URL Link : </label>
                    <textarea 
                    className="inputTextArea"
                    type="text" 
                    name="url"
                    value={infomation.url}
                    placeholder="URL Link"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div className="addCon">
                    <label className="label" >Date : </label>
                    <input 
                    className="inputCon"
                    type="date" 
                    name="date"
                    value={infomation.date}
                    placeholder="Date"
                    onChange={(e) => inputHandler(e)}
                    />
                </div>
                <button className="cancelBtn">Save</button>
            </form>
        </div>
    )
}

export default EditPosting
