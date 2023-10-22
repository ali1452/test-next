
const Order = (context) => {
  const orderid = context.params.order[1]
  return (
    <h1> Order {orderid} </h1>
  )
}

export default Order