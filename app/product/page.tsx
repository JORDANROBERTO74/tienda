'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { productList } from '@/components/fakeData/productList'
import EmptyImage from '@/components/common/icons/EmptyImage'
import useCart from '@/components/hooks/useCart'
import Image from 'next/image'

export default function Component() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const productData = productList?.find(
    product => product?.id?.toLowerCase() === productId
  )
  const { addToCart } = useCart()

  return (
    <div className="container mx-auto px-0 md:px-6 py-12">
      <div className="flex justify-center w-full">
        <h1 className="text-2xl font-bold mb-6 w-full max-w-[800px]">
          Detalles del Producto
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid gap-8 w-full max-w-[800px]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {productData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  {!!productData?.productImage ? (
                    <div>
                      <Image
                        src={productData?.productImage}
                        alt={`product-${productData?.id}`}
                        className="h-[200px] md:h-[300px] object-cover"
                        width={363}
                        height={100}
                      />
                    </div>
                  ) : (
                    <EmptyImage className="h-[200px] md:h-[300px] w-[300px] object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-3xl font-bold">
                    {!!productData
                      ? `${productData?.price?.currency} ${productData?.price?.amount}`
                      : 'Error al cargar el producto'}
                  </p>
                  <p className="text-gray-600">{productData?.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {!!productData && 'Características principales:'}
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {productData?.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end items-center">
              <div className="flex space-x-2">
                <Button
                  disabled={!productData}
                  onClick={() => {
                    addToCart(productData)
                  }}
                  type="button"
                  className="flex items-center"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
