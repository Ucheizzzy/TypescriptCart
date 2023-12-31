import { createContext, useMemo, useReducer, ReactElement } from 'react'

export type CartItemType = {
  sku: string
  name: string
  price: number
  qty: number
}

type CartStateType = {
  cart: CartItemType[]
}

const initialCartState = {
  cart: [],
}

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
  type: string
  payload?: CartItemType
}

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }
      const { sku, name, price } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )
      const itemsExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      )
      const qty = itemsExists ? itemsExists?.qty + 1 : 1
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] }
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload is missing in REMOVE action')
      }
      const { sku } = action.payload
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )
      return { ...state, cart: [...filteredCart] }
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload)
        throw new Error('action.payload missing in QUANTITY action')
      const { sku, qty } = action.payload
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku == sku
      )
      if (!itemExists)
        throw new Error(' Item must exist in order to update quantity')
      const updateItem: CartItemType = { ...itemExists, qty }

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      )

      return { ...state, cart: [...filteredCart, updateItem] }
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }
    default:
      throw new Error('unidentified reducer action type')
  }
}

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState)
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty
  }, 0)

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + (cartItem.qty + cartItem.price)
    }, 0)
  )

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4))
    const itemB = Number(b.sku.slice(-4))
    return itemA - itemB
  })
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UserCartContextType = ReturnType<typeof useCartContext>

const initialCartContextState: UserCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
}

const CartContext = createContext<UserCartContextType>(initialCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  )
}
export default CartContext
