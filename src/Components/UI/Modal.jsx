import React from 'react';
import ReactDOM  from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) =>{
    return(
        <div className={styles.backdrop} onClick={props.hide}>

        </div>
    )
}

const ModalWindow = (props) =>{
    return(
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.querySelector('#overlays')

const Modal = (props) =>{
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop hide={props.hide}/>,portalElement)}
            {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>,portalElement)}
        </React.Fragment>
    )
}

export default Modal