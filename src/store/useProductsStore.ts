import { create } from "zustand";
import { Product } from "../types";

interface ProductState {
    products: Product[]
    loading: boolean
    error: string | null
    getAllProducts: () => Promise<void>
}


const useProductsStore = create<ProductState> ((set) => ({
    products: [],
    loading: false,
    error: null,

    getAllProducts: async () => {
        set({ loading: true, error: null });
        try {                           //http://localhost:3000/api/products PC
            const response = await fetch('http://192.168.1.105:3000/api/products') //MOBILE
            if (!response.ok) throw new Error('Network response was not ok');
            const products = await response.json()
            set({ products: products, loading: false, error: null})
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch products';
            set({ error: errorMessage, loading: false })
        }
    }
}))

export default useProductsStore