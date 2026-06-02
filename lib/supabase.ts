import { createClient } from '@supabase/supabase-js'
import { Product } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Maps a Supabase row (snake_case) to our Product type (camelCase)
export function mapProduct(row: Record<string, unknown>): Product {
  return {
    id:            String(row.id),
    name:          String(row.name),
    description:   String(row.description ?? ''),
    price:         Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    category:      row.category as Product['category'],
    image:         String(row.image ?? ''),
    inStock:       Boolean(row.in_stock),
    featured:      Boolean(row.featured),
    createdAt:     String(row.created_at),
  }
}
