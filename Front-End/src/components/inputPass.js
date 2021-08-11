import React, { useState } from 'react'
import '../styles/component.css'

const InputPass = (props) => {
    
    const [showPass, setShowPass] = useState(true)

    const showHandler = () => {
        setShowPass(!showPass)
    }
    
    return (
        <div className="inputContainer">
            <label className="label" >{props.label}</label>
            {showPass ? 
            <div className="passwordCon">
                <input 
                className="passwordInput"
                type="password"
                name={props.name}
                value={props.value}
                placeholder={props.PHolder}
                onChange={props.onChange}
                />
                <i className='far' onClick={showHandler}>&#xf06e;</i>
            </div> :
            <div className="passwordCon">
                <input 
                className="passwordInput"
                type="text"
                name={props.name}
                value={props.value}
                placeholder={props.PHolder}
                onChange={props.onChange}
                />
                <i className='far' onClick={showHandler}>&#xf070;</i>
            </div>
            }
        </div>
    )
}

export default InputPass
