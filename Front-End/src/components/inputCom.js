import React from 'react'
import '../styles/component.css'

const InputCom = (props) => {
    return (
        <div className="inputContainer">
            <label className="label" >{props.label}</label>
            <input 
            className="inputCon"
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.PHolder}
            onChange={props.onChange}
            />
        </div>
    )
}

export default InputCom
