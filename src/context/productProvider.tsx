import { createContext, ReactElement, useState } from 'react'
export type ProductType = {
  sku: string
  name: string
  price: number
}

const InitialState: ProductType[] = [
  {
    sku: 'item0001',
    name: 'Widget',
    price: 9.99,
  },
  {
    sku: 'item0002',
    name: 'Premium Widget',
    price: 19.99,
  },
  {
    sku: 'item0003',
    name: 'Deluxe Widget',
    price: 29.99,
  },
]
export type UseProductsContextType = { products: ProductType[] }

const initialContextState: UseProductsContextType = { products: [] }

const ProductContext =
  createContext<UseProductsContextType>(initialContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [products] = useState<ProductType[]>(InitialState)

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductType[]> => {
  //     const data = await fetch('http://localhost:3500/products')
  //       .then((response) => {
  //         return response.json()
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message)
  //       })
  //     console.log(data)

  //     return data
  //   }
  //   fetchProducts().then((products) => setProducts(products))
  // }, [])

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  )
}
export default ProductContext
