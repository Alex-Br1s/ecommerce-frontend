import { create } from "zustand";
import { Product } from "../types";

interface ProductState {
    products: Product[]
    loading: boolean
    error: string | null
    getAllProducts: () => Promise<void>
    deleteProduct: (id:number) => Promise<void>
}


const useProductsStore = create<ProductState> ((set, get) => ({
    products: [],
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
            const errorMessage = (error as Error).message || 'Failed to fetch products'
            set({error: errorMessage, loading: false})
        }
    }
}))

export default useProductsStore