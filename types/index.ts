export type Category = 'cachorros' | 'gatos' | 'passaros' | 'peixes' | 'outros'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: Category
  image: string
  inStock: boolean
  featured: boolean
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  neighborhood: string
  city: string
}
