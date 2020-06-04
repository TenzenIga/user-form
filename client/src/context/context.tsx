import React, {createContext, useReducer } from 'react';
import { IState, IWorker, IAction } from '../interfaces/interfaces';


const initialState:IState = {
    workers:[],
    selected:{} as IWorker
}

export const Store = createContext<IState | any>(initialState);

function reducer(state:IState,action:IAction){
    switch (action.type) {
        case 'FETCH_DATA':
            return {...state, workers:action.payload }
        case 'SELECT_WORKER':
            return {...state, selected:action.payload }
        case 'FILTER_WORKERS':
            return {...state, workers:action.payload }
        case 'SORT_WORKERS':
            return {...state, workers:action.payload }
        case 'SAVE_WORKER':
            return {...state, workers:action.payload}
        case 'EDIT_WORKER':
            return {...state, workers:action.payload}
        case 'DELETE_WORKER':
            return { selected:action.payload.selected, workers:action.payload.workers }
        default:
            return state;
    }
}

export function StoreProvider(props:JSX.ElementChildrenAttribute): JSX.Element{
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}