import React from "react";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import  userpic from "../../userpic.png"
import axios from 'axios';
import { Store } from "../../context/context";
import { IWorker } from "../../interfaces/interfaces";


type Inputs = {
  example: string,
  exampleRequired: string,
};

type Props = {
  close:Function
}


export default function EditUser(props:Props) {
  const {close} = props;
  const { register, handleSubmit, control } = useForm<Inputs>();
  const {state, dispatch} = React.useContext(Store);
  const {selected, workers} = state;

  const onSubmit = (data:any) =>{
      const form = new FormData();
      if(file){
        form.append('userPhoto', file, file.name);
      }
      form.append('first_name', data.first_name);
      form.append('last_name', data.last_name);
      form.append('birthday', data.birthday);
      form.append('position', data.position);
      form.append('isRemote', data.isRemote);
      form.append('city', data.city);
      form.append('street', data.street);
      form.append('building', data.building);
      form.append('flat', data.flat);

      axios.put(`/api/workers/${selected._id}` , form).then(res =>{
        if(res.status === 200){
           let editedWorkers = workers.map((worker:IWorker)=>{
              if(worker._id === res.data._id){
                return res.data;
              }
              return worker;
            })

            dispatch({type:'EDIT_WORKER', payload:editedWorkers})
            close(false)
            }          
        }
      )
    }
  const [file, setFile] = React.useState<null | File>(null) // default user avatar is userpic
  

  // load image with preview
  const handleChange = (event:React.ChangeEvent<HTMLInputElement> ) => {  
    if(event.target.files?.length){      
      setFile(event.target.files[0])
    }
  }
  // URL.createObjectURL
  const userPhoto = {
      backgroundImage : selected.photo ? `url(./upload/${selected.photo})` : `url(${userpic})`
  }
  
  if(file){
    userPhoto.backgroundImage  = `url(${URL.createObjectURL(file)})`  //: `url(./upload/${selected.photo})`,
  }



  return (
    <div>
        <div className='heading'>Новый работник</div> 
        <form  onSubmit={handleSubmit(onSubmit)}>
        <div className='user-form' >
          {/* register your input into the hook by invoking the "register" function */}
          <div className='user-form__col'>
              <div className='user-photo' style={userPhoto}></div>
              <input name="userPhoto" type='file' ref={register} onChange={handleChange} />
          </div>
          <div className='user-form__col '>
              <label htmlFor="first_name">Имя</label>
              <input name="first_name" defaultValue={selected.first_name} ref={register({ required: true })} />
              <label htmlFor="last_name">Фамилия</label>
              <input name="last_name" defaultValue={selected.last_name} ref={register({required: true})} />
              <label htmlFor="birthday">Дата рождения</label>
              <Controller as={ReactDatePicker}
                  control={control}
                  valueName="selected" // DateSelect value's name is selected
                  onChange={([selected]) => selected}
                  name="birthday"
                  className="input"
                  required={true}
                  defaultValue={new Date(selected.birthday)}
                />
              <label htmlFor="position">Должность</label>
              <select name="position" defaultValue={selected.position} ref={register}>
                  <option value="техник">техник</option>
                  <option value="программист">программист</option>
                  <option value="бухгалтер">бухгалтер</option>
              </select>
              <label className='checkbox-wrapper' > Удаленка
                  <input type="checkbox" defaultChecked={selected.isRemote} name="isRemote" ref={register} />
                  <span className='checkmark'></span>
              </label>
          </div>
          <div className='user-form__col'>
              <label htmlFor="city">Город</label>
              <input name="city" defaultValue={selected.city} ref={register({ required: true })} />
              <label htmlFor="street">Улица</label>
              <input name="street" defaultValue={selected.street} ref={register({ required: true })} />
              <label htmlFor="building">Дом</label>
              <input name="building"  defaultValue={selected.building} ref={register({ required: true })} />
              <label htmlFor="flat">Квартира</label>
              <input name="flat" defaultValue={selected.flat} ref={register({ required: true })} />
          </div>
         </div> 
        <button className='user-form__submit' type="submit" >Сохранить</button>      
         </form>
    </div>

  );
}
