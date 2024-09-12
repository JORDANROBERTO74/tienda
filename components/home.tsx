'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { productList } from './fakeData/productList'
import useCart from './hooks/useCart'
import EmptyImage from './common/icons/EmptyImage'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCT } from './navigation/Constants'
import { SearchX } from 'lucide-react'
import Image from 'next/image'

export default function ProductCatalog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchValue = searchParams.get('search')
  const { addToCart } = useCart()

  const productListFiltered = productList?.filter(obj => {
    const search = !!searchValue
      ? obj?.name?.toLowerCase().includes(searchValue.toLowerCase())
      : obj
    return search
  })

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">
        {!!searchValue ? `Buscando "${searchValue}"` : 'Nuestros Productos'}
      </h1>
      {!productListFiltered?.length ? (
        <div className="flex items-center justify-center text-muted-foreground">
          <SearchX className="w-5 h-5 mr-2" />
          <p>No se encontraron resultados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {productListFiltered?.map((product: any, index: number) => (
            <div
              key={product?.id}
              className="bg-card rounded-lg shadow-md overflow-hidden flex items-center flex-col cursor-pointer"
              onClick={() => router.push(`${PRODUCT}?id=${product?.id}`)}
            >
              {!!product?.productImage ? (
                <div>
                  <Image
                    src={product?.productImage}
                    alt={`product-${index}`}
                    className="h-48 object-cover"
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div className="flex">
                  <EmptyImage className="h-48" />
                </div>
              )}
              <div className="flex flex-col justify-between p-4 w-full h-full">
                <h2
                  className="text-lg font-semibold mb-2"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    WebkitLineClamp: 2
                  }}
                >
                  {product?.name}
                </h2>
                <div>
                  <p className="text-primary font-bold">
                    {product?.price?.currency}
                    {product?.price?.amount.toFixed(2)}
                  </p>
                  <Button
                    onClick={event => {
                      event.stopPropagation()
                      addToCart(product)
                    }}
                    type="button"
                    className="w-full mt-4"
                  >
                    Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
