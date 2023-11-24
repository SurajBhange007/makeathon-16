import React from 'react'
import  '../Style/Modal.css'
import ReactDOM from 'react-dom';
// import { useNavigate } from 'react-router-dom';

export default function Modal(props) {
    // const navigator = useNavigate();
    if (!props.open) return null;
    // const onClose = () => {
    //     props.onClose();
    //     navigator('/')
    // }
  return ReactDOM.createPortal(
    <>
    <div className='modal-overlay'/>
    {/* //onClick={onClose} */}
    <div className='custom-modal'>
        <h2 className="title">{props.title}</h2>
    <div>{props.children}</div>
    </div></>, document.getElementById('loginPage')
)
}
