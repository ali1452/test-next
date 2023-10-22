"use client"
import React, { useEffect, useState } from 'react'
import CreateUser from './createUser'
import style from  './user.module.scss'
import { FaTrashAlt } from "react-icons/fa";
import { deleteUser, fetchAllUsers } from '@/services/userservices'
import ReactPaginate from 'react-paginate'
import Loader from '@/components/loader'


const UserComp = () => {
  const [userList, setUserList] = useState([])
  const [isloading,setIsloading]  = useState(true)
  const [search,setSearch] = useState('')
  const [itemOffset, setItemOffset] = useState(0);
  const [showErr, setShowErr] = useState(false)
  const itemsPerPage = 5
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = userList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userList.length;
    setItemOffset(newOffset);
  };


  const fetchUser = async() =>{
    try {
      const users = await fetchAllUsers()
      setUserList(users.data)
      setIsloading(false)
      
    } catch (error) {
      setIsloading(false)
      setShowErr(true)
    }
   
  }
  useEffect(()=>{
  fetchUser()
  },[])

  const deleteUsert = async(id:string)=>{
    setIsloading(true)
    const response = await deleteUser(id)
    
    setTimeout(()=>{
    setIsloading(false)
    },1000)
   console.log({id})
  }

  const filterData =()=>{
    const result =  currentItems.filter((item)=>{
      if(search  ==''){
        return  (item.first_name)
      }else{
        return (
          item.first_name.toLowerCase().includes(search.toLowerCase()) || item.last_name.toLowerCase().includes(search.toLowerCase())
        )
      }
    })
    return result
  }

  const tempState =(data)=>{
    const temp_state  = [...data]
    setUserList(temp_state)
  }

  return (
    <>
    {!showErr? <>
      {!isloading?
    <div className={style.container}>
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={style.pagination_container}        />
      </>
    <input className={style.search_input}  placeholder='search'  type='text' value={search} onChange={(e)=>setSearch((e.target.value))}/>

    <CreateUser style={style} data={userList} setList={tempState} isloading={isloading} setIsLoading={setIsloading} />
    
    <h3>User List</h3>
    {currentItems && currentItems.length > 0 && filterData().map((item)=>{
      return(
        <p className={style.card} key={item._id}>{item.first_name} {item.last_name} <FaTrashAlt className={style.delete_icon} onClick={()=>deleteUsert(item._id)} /></p>
      ) 
    })}
    </div>:<Loader/>
    }
    </>:<h1>Network problem</h1>}
    </>
  )
}

export default UserComp