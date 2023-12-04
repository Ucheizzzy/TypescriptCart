import useCart from '../hooks/useCart'

type Props = {
  viewCart: boolean
}

const Footer = ({ viewCart }: Props) => {
  const { totalItems, totalPrice } = useCart()
  return (
    <footer className='footer'>
      {viewCart ? (
        <p>Shopping Cart &copy; {new Date().getFullYear()}</p>
      ) : (
        <>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
          <p>Shopping Cart &copy; {new Date().getFullYear()}</p>
        </>
      )}
    </footer>
  )
}

export default Footer
