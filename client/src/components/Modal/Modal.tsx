import React, { FunctionComponent } from 'react'
import './Modal.css';

type Props = {
    show:boolean,
    close:Function
}

export const Modal:FunctionComponent<Props> = (props) => {
    return (
        <div>
            {props.show ?
  <div className='modal'>
        <div className='modal__body'>
        <span className='modal__close'
          onClick={e => props.close(false)}  
        >
          &#215;
        </span>
        {props.children}          
        </div>
    </div> : null
        }            
        </div>
    )
}
