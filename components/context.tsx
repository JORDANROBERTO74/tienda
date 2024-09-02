'use client'

import React from 'react'

export const CartList = React.createContext<any>({})
export const CartListProvider = ({ children }: any) => {
  const [cartProductList, setCartProductList] = React.useState([])

  return (
    <CartList.Provider value={{ cartProductList, setCartProductList }}>
      {children}
    </CartList.Provider>
  )
}
