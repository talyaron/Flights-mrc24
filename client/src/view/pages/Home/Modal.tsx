import React from 'react';
import styles from './LoginRegister.module.scss';

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-container']}>
                <button onClick={onClose} className={styles['close-button']}>✕</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;