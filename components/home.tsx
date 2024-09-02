import React from 'react'
import { ArrowUpDownIcon, Search, SlidersHorizontalIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox'
import { capitalize, upperCase } from 'lodash'
import { cn } from '@/lib/utils'
import { productList } from '@/components/fakeData/productList'
import AddToCartIcon from './common/icons/AddToCartIcon'
import useCart from './hooks/useCart' // Asegúrate de que la ruta sea correcta
import EmptyImage from './common/icons/EmptyImage'

const Home = () => {
  const [isFilterHiding, setIsFilterHiding] = React.useState(true)
  const [sortByOpen, setSortByOpen] = React.useState(false)
  const [sortByValue, setSorByValue] = React.useState('Recomendados')
  const [categorySearchIsFocused, setCategorySearchIsFocused] =
    React.useState(false)
  const [categorySearchValue, setCategorySearchValue] = React.useState('')
  const [brandSearchIsFocused, setBrandSearchIsFocused] = React.useState(false)
  const [brandSearchValue, setBrandSearchValue] = React.useState('')

  const sortByOptions = [
    { label: 'Recomendados' },
    { label: 'Novedades' },
    { label: 'Menor a mayor precio' },
    { label: 'Mayor a menor precio' },
    { label: 'Mejor evaluados' },
    { label: 'Más populares' }
  ]

  const categoryList = [
    { name: 'Teclados', id: '0' },
    { name: 'Audífonos', id: '1' },
    { name: 'Cables y accesorios', id: '2' }
  ]

  const marcas = [
    { name: 'EZVIZ', id: '0' },
    { name: 'FORZA', id: '1' },
    { name: 'STV', id: '2' },
    { name: 'TP-LINK', id: '3' }
  ]

  const { addToCart } = useCart()

  return (
    <div className="w-full px-5 pt-5">
      <div className="flex gap-5">
        <div className="text-[22px] font-bold">Todos los productos</div>
        <div>
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center text-sm">
          <span className="font-bold mr-1 text-primary">1052</span>productos
          encontrados
        </div>
      </div>
      <div className="py-5 flex justify-between items-center">
        <Button
          onClick={() => setIsFilterHiding(!isFilterHiding)}
          variant={'outline'}
          type="button"
        >
          <div className="flex gap-1 items-center">
            <SlidersHorizontalIcon size={'16px'} />
            <div>
              {isFilterHiding ? 'Ocultar filtros' : 'Todos los filtros'}
            </div>
          </div>
        </Button>
        <DropdownMenu open={sortByOpen} onOpenChange={setSortByOpen}>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost">
              <div className="flex items-center gap-1">
                <span>Ordenado por:</span>
                <span>{sortByValue}</span>
                <span>
                  <ArrowUpDownIcon size={'16px'} />
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuGroup>
              {sortByOptions?.map((option, index) => (
                <div key={index}>
                  {index !== 0 && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={() => setSorByValue(option?.label)}
                    className="cursor-pointer"
                  >
                    {capitalize(option?.label)}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={isFilterHiding ? 'flex justify-between gap-6' : ''}>
        {isFilterHiding && (
          <div className="flex-1 text-sm flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Rango de precios</div>
              <div className="flex justify-between gap-2">
                <Input type="number" placeholder="Mínimo" />
                <Input type="number" placeholder="Máximo" />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <div className="font-semibold flex gap-1 items-center">
                <Checkbox id="category-title" defaultChecked />
                <label
                  htmlFor="category-title"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Categorías
                </label>
              </div>
              <div
                className={cn(
                  `flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${
                    categorySearchIsFocused &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  } items-center`
                )}
              >
                <div className="flex items-center justify-center pl-3 text-muted-foreground">
                  <Search className="w-4 h-4" />
                </div>
                <Input
                  placeholder="Buscar..."
                  type="search"
                  className="h-[38px] border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  onFocus={() => setCategorySearchIsFocused(true)}
                  onBlur={() => setCategorySearchIsFocused(false)}
                  onChange={e => setCategorySearchValue(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                {categoryList?.map((category, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <Checkbox id={`category-${category?.id}`} defaultChecked />
                    <label
                      htmlFor={`category-${category?.id}`}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        WebkitLineClamp: 3
                      }}
                    >
                      {capitalize(category?.name)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <div className="font-semibold flex gap-1 items-center">
                <Checkbox id="brand-title" defaultChecked />
                <label
                  htmlFor="brand-title"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marcas
                </label>
              </div>
              <div
                className={cn(
                  `flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${
                    brandSearchIsFocused &&
                    'outline-none ring-2 ring-ring ring-offset-2'
                  } items-center`
                )}
              >
                <div className="flex items-center justify-center pl-3 text-muted-foreground">
                  <Search className="w-4 h-4" />
                </div>
                <Input
                  placeholder="Buscar..."
                  type="search"
                  className="h-[38px] border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  onFocus={() => setBrandSearchIsFocused(true)}
                  onBlur={() => setBrandSearchIsFocused(false)}
                  onChange={e => setBrandSearchValue(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                {marcas?.map((brand, index) => (
                  <div key={index} className="flex gap-1 items-center">
                    <Checkbox id={`brand-${brand?.id}`} defaultChecked />
                    <label
                      htmlFor={`brand-${brand?.id}`}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        WebkitLineClamp: 3
                      }}
                    >
                      {capitalize(brand?.name)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full md:w-[80%]">
          {productList?.map((product, index) => (
            <div
              key={index}
              className="bg-background rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => console.log('card clicked')}
              >
                <div>
                  {product?.productImage ? (
                    <div
                      style={{
                        width: '200px',
                        height: '200px',
                        backgroundImage: `url(${product?.productImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ) : (
                    <div className="w-full h-[200px] w-[200px] flex items-center justify-center">
                      <EmptyImage width={'200px'} height={'200px'} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      display: '-webkit-box',
                      WebkitLineClamp: 1
                    }}
                  >
                    {capitalize(product?.productName)}
                  </h3>
                  <p
                    className="text-muted-foreground mb-4"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      display: '-webkit-box',
                      WebkitLineClamp: 1
                    }}
                  >
                    {upperCase(product?.productSlug)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex text-lg">
                      <span className="text-primary font-bold">
                        {product?.price?.currency}
                      </span>
                      <span className="text-primary font-bold">
                        {product?.price?.amount}
                      </span>
                    </div>
                    <Button
                      onClick={event => {
                        event.stopPropagation()
                        addToCart(product)
                      }}
                      type="button"
                      size={'sm'}
                    >
                      <AddToCartIcon width={'22px'} height={'22px'} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
