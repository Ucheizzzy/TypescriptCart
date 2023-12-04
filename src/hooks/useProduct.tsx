import { useContext } from 'react'
import ProductContext, {
  UseProductsContextType,
} from '../context/productProvider'

const useProduct = (): UseProductsContextType => {
  return useContext(ProductContext)
}

export default useProduct
