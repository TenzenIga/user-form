import { IWorker } from "../interfaces/interfaces";


export function filterWorkers(char:string){
    return function innerFilter(worker:IWorker){
         if(worker.first_name.toLowerCase().indexOf(char.toLowerCase()) === -1){
            worker.show = false;
            return worker;
         }
          worker.show = true;
          return worker;
    }      
}