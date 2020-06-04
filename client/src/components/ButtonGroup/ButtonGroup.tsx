import React from 'react'
import './ButtonGroup.css';
import { Store } from '../../context/context';
import { IWorker } from '../../interfaces/interfaces';
import axios from 'axios';

type Props = {
    openAddUserModal:Function
    openEditUserModal:Function
}

export default function ButtonGroup(props:Props) {
  const {openAddUserModal, openEditUserModal} = props;
  const {state, dispatch} = React.useContext(Store); 
  const {selected, workers} = state;
  
  
  const deleteWorker = (worker:IWorker)=>{
     axios.delete(`/api/workers/${worker._id}`).then(res=>{
       if(res.status === 200){
        let newWorkerList = workers.filter((w:IWorker) => w._id !== worker._id )
        dispatch({type:'DELETE_WORKER', payload:{selected:{}, workers:newWorkerList}})
       }
     }).catch(err => console.log(err))
    }
    
  return (
    <div className='button-group'>
        <button className='btn' onClick={()=>openAddUserModal(true)} >Добавить</button>
        <button className='btn' onClick={()=>openEditUserModal(true)} >Редактировать</button>
        <button className='btn' onClick={()=>deleteWorker(selected)} >Удалить</button>
      </div>
    )
}
