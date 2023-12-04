import { useState } from 'react'
import useCart from '../hooks/useCart'
import { CartLineItem } from '.'
const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()
  console.log(cart)

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT })
    setConfirm(!confirm)
  }
  return (
    <div className='main main--cart'>
      {confirm ? (
        <h2>Thank you for your order..</h2>
      ) : (
        <>
          <h2 className='offscreen'>Cart</h2>
          <ul className='cart'>
            {cart.map((item) => {
              return (
                <CartLineItem
                  key={item.sku}
                  item={item}
                  dispatch={dispatch}
                  REDUCER_ACTIONS={REDUCER_ACTIONS}
                />
              )
            })}
          </ul>
          <div className='cart__totals'>
            <p>Total Price: {totalPrice}</p>
            <p>Total Items: {totalItems}</p>
            <button className='cart__submit' onClick={onSubmitOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
