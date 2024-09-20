'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

export interface CartItem {
  productId: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setItems((state) => {
      const productInCart = state.some((item) => item.productId === productId)
      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      } else {
        return [...state, { productId, quantity: 1 }]
      }
    })
  }
  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
