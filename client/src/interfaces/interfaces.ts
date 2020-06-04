export interface IAction{
    type:string,
    payload:any
  }
  
  
export interface IState{
    workers:IWorker[]
    selected:IWorker
  }


export interface IWorker{
    _id:string
    first_name:string
    last_name:string
    birthday:Date
    position:string
    city:string
    street:string | null
    building:string | null
    flat:string | null
    photo:string
    isRemote:boolean
    show:boolean
}
  