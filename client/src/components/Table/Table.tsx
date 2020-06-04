import React from 'react';
import './Table.css';
import { Store } from '../../context/context';
import axios from 'axios';
import { IWorker } from '../../interfaces/interfaces';
import { TableRow } from '../TableRow/TableRow';
import { compareValues } from '../../utils/sort';





export default function Table() {

  const {state, dispatch} = React.useContext(Store); 
  const {workers, selected} = state;
  const [sortBy, setsortBy] = React.useState('');
  
  React.useEffect(() => {
    axios.get('/api/workers').then(res => {
      let workers = res.data.map((item:any) =>{ return {...item, show:true}}) 
      dispatch({type:'FETCH_DATA', payload:workers})
    })
  }, [dispatch])

  const selectWorker = (worker:IWorker) =>{
    dispatch({type:'SELECT_WORKER', payload:worker})
  }

 const handleSort = (property:string) =>{
    let sortedWorkers;
    if(sortBy === property){
      sortedWorkers = workers.sort(compareValues(property, 'desc'))
      setsortBy('')
    }else{
      sortedWorkers = workers.sort(compareValues(property));
      setsortBy(property)
    }

    dispatch({type:'SORT_WORKERS', payload:sortedWorkers})
 }

 const workersList = workers.map( (worker:IWorker) =>
  <TableRow worker={worker} selectWorker ={selectWorker} show={worker.show} active={worker._id === selected._id} key={worker._id} />
  )

  
  return (
    <div className='table-wrapper' >
    <table className='table'>
        <thead>
          <tr>
          <th>Превью</th>
          <th onClick={()=>handleSort('first_name')} >Имя</th>
          <th onClick={()=>handleSort('last_name')} >Фамилия</th>
          <th onClick={()=>handleSort('birthday')} >Дата Рождения</th>
          <th onClick={()=>handleSort('birthday')} >Возраст</th>
          <th onClick={()=>handleSort('position')} >Должность</th>
          <th onClick={()=>handleSort('isRemote')} >Удаленная работа</th>
          <th>Адрес проживания</th>
          </tr>
        </thead>
      <tbody>
        {workersList}
      </tbody>
      </table>
        </div>
    )
}
