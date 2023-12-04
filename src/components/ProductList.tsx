import { ReactElement } from 'react'
import useCart from '../hooks/useCart'
import useProduct from '../hooks/useProduct'
import { Product } from '.'

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart()
  const { products } = useProduct()
  console.log(products)
  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>
  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku)
      return (
        <Product
          key={product.sku}
          product={product}
          inCart={inCart}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
        />
      )
    })
  }
  return <main className='main main--products'>{pageContent}</main>
}

export default ProductList
