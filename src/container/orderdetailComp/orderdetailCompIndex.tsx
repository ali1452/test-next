"use client"

import { fetchAllOrders } from '@/services/orderservices'
import React, { useEffect, useState } from 'react'

const OrderdetailCompIndex = () => {
    const [orderData,setOrderData] = useState([])
    const [isLoading,setIsloading]= useState(true)

    const getOrders = async() =>{
        setIsloading(true)
        const orders = await fetchAllOrders()
        console.log(orders.status)
        if(orders.status == 200){
            setOrderData(orders.data[0].orders)
            setIsloading(false)
        }
    }
    useEffect(()=>{
        getOrders()
    },[])
    
  return (
    <div>
        {isLoading && <h2>...loading</h2>}
        {
            (!isLoading  && orderData && orderData.length > 0) ?
            orderData.map((order,index)=>{
                return (
                    <div key={index} style={{border:'1px solid black',width:"400px",  borderRadius:'10px',padding:'10px',margin: 'auto', marginBottom:'10px',textAlign:'center',backgroundColor:'#fff'}}>
                    <p>Customer Name: {order.customer_name}</p>
                    <p>Shop Name: {order.shop_name}</p>
                    <p>Amount: {order.amount}</p>
                    <p style={{border:'1px solid black',width:'100px',margin:'auto',backgroundColor:'#f8f8f8'}}>
                        {order?.items?.map(((item,index)=>{
                        return <p style={{padding:'3px', borderBottom:'1px solid #000'}} key={index}>{item}</p>
                    }))}</p>
                    </div>
                )
            })
            :""
            }
    </div>
  )
}

export default OrderdetailCompIndex