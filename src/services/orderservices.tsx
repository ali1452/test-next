import axios from "axios"

const url = `http://localhost:5000/orders/`

const fetchAllOrders =async()=>{
    const orders = await axios.get(url)
    return orders
}



export { fetchAllOrders }