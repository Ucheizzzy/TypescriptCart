import CartContext, { UserCartContextType } from '../context/CartProvider'
import { useContext } from 'react'
const useCart = (): UserCartContextType => {
  return useContext(CartContext)
}
export default useCart
