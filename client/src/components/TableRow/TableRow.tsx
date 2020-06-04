import React from 'react'
import { IWorker } from '../../interfaces/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { getAge, formatBirthday } from '../../utils/getAge';


type Props = {
    worker:IWorker
    active:boolean
    selectWorker:Function
    show:boolean
}

export const TableRow = (props:Props) => {
    const {worker, active, selectWorker, show} = props;
    return (
       <>
        {
        show &&
          (<tr key={worker._id} onClick={()=>selectWorker(worker)} className={active ? "active" : ""} >
           <td>
          <div className='user-photo' style={{backgroundImage: worker.photo ? `url(./upload/${worker.photo})`: 'url(./upload/default.png)' }}>
          </div>
          </td>
          <td>
            {worker.first_name}
          </td>
          <td>
            {worker.last_name}
          </td>
          <td>
            {formatBirthday(worker.birthday)}
          </td>
          <td>
            {getAge(worker.birthday)}
          </td>
          <td>
            {worker.position}
          </td>
          <td>
            {worker.isRemote && <FontAwesomeIcon icon={faCheck} /> }
          </td>
          <td>
            {`${worker.city}, ${worker.street}, ${worker.building}, ${worker.flat}`}
          </td>
        </tr>)
      }
      </>
    )

}
