// Type cho ProductType từ backend Go với snake_case
export interface ProductType {
  id: number
  name: string
  description?: string | null
  image_url?: string | null
  created_at: string
  updated_at: string
}

// Type cho ProductSubtype từ backend Go với snake_case
export interface ProductSubtype {
  id: number
  name: string
  description?: string | null
  created_at: string
  updated_at: string
}
