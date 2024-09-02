'use client'

import React from 'react'
import { Separator } from '../../ui/separator'
import LogoInitial from '../../common/Logo/LogoInitial.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Building2,
  ChevronDown,
  GlobeIcon,
  Headset,
  MenuIcon,
  MinusIcon,
  PlusIcon,
  ScrollText,
  Search,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import CartIcon from '@/components/common/icons/CartIcon'
import { CartList } from '@/components/context'
import { capitalize, upperCase } from 'lodash'
import useCart from '@/components/hooks/useCart'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export const Header: React.FC = () => {
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [contactIsOpen, setContactIsOpen] = React.useState(false)
  const [globeOpen, setGlobeOpen] = React.useState(false)
  const [categoriesIsOpen, setCategoriesIsOpen] = React.useState(false)
  const { cartProductList } = React.useContext(CartList)
  const productCartLength = cartProductList?.reduce(
    (sum: any, product: any) => sum + product?.quantity,
    0
  )
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <header>
      <div style={{ zIndex: 101 }}>
        <div className={`flex justify-between px-4 py-2 pt-3 items-center`}>
          <div
            onClick={() => router.push('/')}
            className={`flex cursor-pointer`}
          >
            <Image width={40} height={40} src={LogoInitial.src} alt="Logo" />
            <span
              className={`font-arial text-xl flex justify-center items-center ml-2`}
            >
              Store-App
            </span>
          </div>
          <div
            className={cn(
              `flex h-10 w-full max-w-[50%] rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${
                isSearchFocused && 'outline-none ring-2 ring-ring ring-offset-2'
              } items-center`
            )}
          >
            <div className="flex items-center justify-center pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <Input
              placeholder="Buscar productos, marcas y mas..."
              type="search"
              className="h-[38px] border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between px-4 pb-2 pt-1">
          <DropdownMenu
            open={categoriesIsOpen}
            onOpenChange={setCategoriesIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost">
                <div className="flex items-center gap-1">
                  <span>
                    <MenuIcon size={'16px'} />
                  </span>
                  <span>Categorías</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  Cables y adaptadores
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Teclados
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Audífonos
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost">
              Catálogo
            </Button>
            <DropdownMenu open={contactIsOpen} onOpenChange={setContactIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost">
                  <div className="flex items-center gap-1">
                    <span>Contáctenos</span>
                    <span>
                      <ChevronDown size={'16px'} />
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[200px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Building2 className="mr-2 h-4 w-4" />
                    ¿Quienes somos?
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Headset className="mr-2 h-4 w-4" />
                    Contacto
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <ScrollText className="mr-2 h-4 w-4" />
                    Politicas de garantía
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation={'vertical'} />
            <div className="flex gap-4">
              {!!productCartLength ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative inline-block">
                      <Button
                        variant={'secondary'}
                        size={'icon'}
                        type="button"
                        className="rounded-full"
                      >
                        <CartIcon />
                      </Button>
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform -translate-y-1/2">
                        {productCartLength}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-96">
                    <div>
                      <div className="flex gap-1 mb-2 font-semibold">
                        <span>Productos en el carrito</span>
                        <span>{`(${productCartLength})`}</span>
                      </div>
                      <div className="h-full max-h-[376px] overflow-auto">
                        {cartProductList?.map((product: any, index: number) => (
                          <div key={index}>
                            <div className="flex gap-2 w-full items-center">
                              <div
                                style={{
                                  width: '150px',
                                  height: '90px',
                                  backgroundImage: `url(${product?.productImage})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              />
                              <div className="flex flex-col gap-1 w-full">
                                <div
                                  className="font-semibold text-sm"
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitBoxOrient: 'vertical',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1
                                  }}
                                >
                                  {capitalize(product?.productName)}
                                </div>
                                <div
                                  className="text-sm"
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitBoxOrient: 'vertical',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1
                                  }}
                                >
                                  {upperCase(product?.productSlug)}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex text-lg">
                                    <span className="text-primary font-bold">
                                      {product?.price?.currency}
                                    </span>
                                    <span className="text-primary font-bold">
                                      {product?.price?.amount}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-4">
                                      {product?.quantity === 1 ? (
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          className="px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                          onClick={() =>
                                            removeFromCart(product?.id)
                                          }
                                        >
                                          <Trash2 className="text-destructive h-4 w-4" />
                                        </Button>
                                      ) : (
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          className="px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                          onClick={() =>
                                            updateQuantity(
                                              product?.id,
                                              product?.quantity - 1
                                            )
                                          }
                                        >
                                          <MinusIcon className="h-4 w-4" />
                                        </Button>
                                      )}
                                      <div className="text-lg font-medium">
                                        {product?.quantity}
                                      </div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                        onClick={() =>
                                          updateQuantity(
                                            product?.id,
                                            product?.quantity + 1
                                          )
                                        }
                                      >
                                        <PlusIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <Button type="button" className="w-full">
                        Ver carrito
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'secondary'}
                      size={'icon'}
                      type="button"
                      className="rounded-full"
                    >
                      <CartIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex flex-col gap-2 items-center py-4">
                      <CartIcon width={'40px'} height={'40px'} />
                      <p>Carrito de compras está vacío</p>
                      <p className="text-center text-xs font-normal">
                        ¡Bienvenida/o de regreso! Añade productos al carrito
                        para realizar tu compra.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <DropdownMenu open={globeOpen} onOpenChange={setGlobeOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    type="button"
                    className="rounded-full"
                  >
                    <GlobeIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Moneda</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Select defaultValue="BS">
                        <SelectTrigger>
                          <SelectValue placeholder={'Divisa...'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value="BS">
                            BOB / BS
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Idioma</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Select defaultValue="esp">
                        <SelectTrigger>
                          <SelectValue placeholder={'Lenguaje...'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value="esp">
                            Español
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </header>
  )
}

export default Header
