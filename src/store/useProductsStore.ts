import { create } from "zustand";
import { NewProduct, Product } from "../types";

interface ProductState {
    products: Product[]
    selectedProduct: Product | null
    loading: boolean
    error: string | null
    getAllProducts: () => Promise<void>
    addProduct: (newProduct: NewProduct) => Promise<void>
    updateProduct: (id: number | null, productToUpdate: Partial<NewProduct>) => Promise<void>
    deleteProduct: (id:number) => Promise<void>
    getOneProduct: (id: number) => Promise<void>
    clearSelectedProduct: () => void
}


const useProductsStore = create<ProductState> ((set, get) => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,

    getAllProducts: async () => {
        set({ loading: true, error: null });
        try {                           //http://localhost:3000/api/products PC
            const response = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}products`) //MOBILE
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json()
            set({ products: products, loading: false, error: null})
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch products';
            set({ error: errorMessage, loading: false })
        }
    },
    addProduct: async(newProduct: NewProduct) => {
        console.log(newProduct)
        set({loading: true, error: null})
        try {
            const response = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}product/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                },
                body: JSON.stringify(newProduct)
            })
            console.log(response)
            if (!response.ok) throw new Error('Network response was not ok')
            const createdProduct = await response.json()
            set(state => ({
                products: [...state.products, createdProduct],
                loading: false,
                error: null
            }))
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to create product'
            set({error: errorMessage, loading: false})
        }
    },

    updateProduct: async (id: number | null, productToUpdate: Partial<NewProduct>) => {
        set({loading: true, error: null})
        console.log(id)
        console.log(productToUpdate)
        try {
            const response = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}product/edit/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                },
                body: JSON.stringify(productToUpdate)
            })
            if(!response.ok) throw new Error('Network response was not ok')
            const updatedProduct = await response.json()
            console.log(updatedProduct)
            await get().getAllProducts()
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to update product'       
            set({error: errorMessage, loading: false})
        }
    },

    deleteProduct: async (id:number) => {
        set({loading: true, error: null})
        try {
            const response = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}product/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                }
            })
            if(!response.ok) throw new Error('Network response was not ok')
            await get().getAllProducts()
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to delete product'
            set({error: errorMessage, loading: false})
        }
    },
    getOneProduct: async (id:number) => {
        set({loading: true, error: null})
        try {
            const response = await fetch (`${import.meta.env.VITE_MOBILE_BACKEND_URL}product/${id}`)
            if(!response.ok) throw new Error('Network response was not ok')
            const product = await response.json()
            set({selectedProduct: product, loading: false, error: null})
        } catch (error) {
            const errorMessage = (error as Error).message
            set({error: errorMessage, loading: false})
        }
    },
    clearSelectedProduct: () => set({selectedProduct: null})
}))

export default useProductsStore