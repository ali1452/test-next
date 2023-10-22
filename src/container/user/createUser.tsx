import { createUser, fetchAllUsers } from '@/services/userservices'
import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

type  IProps = {
style:any,
data:any,
setList:any,
isloading:boolean,
setIsLoading:Dispatch<SetStateAction<boolean>>
}

const CreateUser = ({style,data,setList,isloading,setIsLoading}:IProps) => {
    const [newUser, setNewUser] =useState({first_name:'',last_name:''})
    const [err,setErr] = useState<string>('')
    
    const submitNewUSer =async(user:any)=>{
      setIsLoading(true)
      const {first_name,last_name}  = user
      if(first_name !== '' && last_name !==''){
        
        const newUser = await createUser(user)
        
        if(newUser.status == 201){
          await fetchAllUsers()
          data.push(user)
          setList(data)
          setIsLoading(false)
          // console.log('...data',data)
        }
      }else{
        setErr('please enter complete name')
        setIsLoading(false)
      }
    }


  return (
    <>
    <h4>CreateUser</h4>
    <p>
    <input  placeholder='First Name' value={newUser.first_name} type='text' onChange={(e)=>{
      setErr('')
      setNewUser({...newUser, first_name:e.target.value})}} />
    <input placeholder='Last Name' value={newUser.last_name} type='text'  onChange={(e)=>setNewUser({...newUser, last_name:e.target.value})} />
    </p>
    <p>{err}</p>
    <p className={style.submit_btn_p}>
    <button className={style.submit_btn} onClick={()=>submitNewUSer(newUser)}>Submit</button>
    </p>
    </>
  )
}

export default CreateUser