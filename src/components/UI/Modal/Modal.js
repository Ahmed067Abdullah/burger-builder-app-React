import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
// import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    render(){
        return(
            <div className = {classes.Modal}>
                {this.props.children}
            </div>
        )
    }   
}

export default Modal;