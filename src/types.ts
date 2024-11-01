export interface User {
    id: number
    firstName: string
    lastName: string
    profilePicture: string
    email: string
    role: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: number
    categoryName: string
    description: string
}

export interface Product {
    id: number 
    name: string
    price: number
    offer: boolean
    salePrice?: number | null
    stock: number
    description?: string
    images: string[]
    createdAt: string
    updatedAt: string
    categories: Category[]
}