import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';
import '../styles/component.css'

const DeleteModal = (props) => {

    const modalStyle = {
        overlay : {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
    };

    return (
        <CSSTransition
        in={props.showModal}
        timeout={300}
        classNames="dialog"
        >
            <Modal
            isOpen={props.showModal}
            onRequestClose={props.closeModal}
            closeTimeoutMS={500}
            className="DeleteModalCon"
            style={modalStyle}
            >
                <div className="deleteModalText">Delete will make this {props.type} be delete <span style={{color: 'red', fontWeight: '600'}}>PERMANENTLY</span> !</div>
                <div className="deleteModalText">Please think twice before taking delete action !</div>
                <div className="deleteModalBtnCon">
                    <div className="deleteModalBtn" onClick={props.onDelete} >DELETE</div>
                    <div className="deleteModalBtn" onClick={props.onCloseModal} >CANCEL</div>
                </div>
            </Modal>
        </CSSTransition>
    )
}

export default DeleteModal
