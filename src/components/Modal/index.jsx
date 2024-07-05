import React, {useEffect} from 'react';
import Portal from './Portal'
import { Overlay, Dialog } from './../Modal/styled';
import styled from 'styled-components';

const Modal = ({children, open, onClose}) => {
    useEffect(() => {
        const onEsc = (e) => {
            if (e.keyCode === 27) onClose();
        }
        window.addEventListener('keydown', onEsc);
        return () => {window.removeEventListener('keydown', onEsc)};
    }, [onClose]);
    
    if (!open) return null;  
    
    const handleClose = () => {
        onClose();
    }
    const onDialogClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Portal>
           <Overlay onClick={handleClose}>
             <Dialog onClick={onDialogClick}>
                {children}
             </Dialog>   
 
           </Overlay>
        </Portal>
    );
};

export default Modal;