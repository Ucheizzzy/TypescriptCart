import { Navbar } from '.'
import useCart from '../hooks/useCart'
type Props = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}
const Header = ({ viewCart, setViewCart }: Props) => {
  const { totalItems, totalPrice } = useCart()
  // console.log(totalItems, totalPrice)

  return (
    <header className='header'>
      <div className='header__title-bar'>
        <h1>LionTypeScriptCart</h1>
        <div className='header__price-box'>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Navbar viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )
}

export default Header
