import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.css';
import { filterWorkers } from '../../utils/search';
import { Store } from '../../context/context';

export default function Search() {
    const {state, dispatch} = React.useContext(Store)
    const {workers} = state;
    const [search, setSearch] = React.useState('');

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{

        let filteredWorkers = workers.filter(filterWorkers(e.target.value));
        dispatch({type:'FILTER_WORKERS', payload:filteredWorkers});
        setSearch(e.target.value);
    }
    
    return (
        <div className='search-wrapper'>
            <button><FontAwesomeIcon icon={faSearch} /></button>
          <input type="text" value={search}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)} />
      </div>
    )
}
