import { Cart, Footer, Header, ProductList } from './components'
import { useState } from 'react'
const App = () => {
  const [viewCart, setViewCart] = useState<boolean>(false)
  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {viewCart ? <Cart /> : <ProductList />}

      <Footer viewCart={viewCart} />
    </>
  )
}

export default App
//to create a json server
//  npx json-server -w data/products.json -p 3500
