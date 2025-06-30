// Type cho ProductType từ backend Go với camelCase
export interface ProductType {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  createdAt: string
  updatedAt: string
}

// Type cho ProductSubtype từ backend Go với camelCase
export interface ProductSubtype {
  id: number
  name: string
  description?: string | null
  createdAt: string
  updatedAt: string
}
