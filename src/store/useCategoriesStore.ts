import { create } from "zustand";
import { Category, Product } from "../types";



interface CategoryState {
    categories: Category[];
    associatedProducts: Product[] | null
    loading: boolean;
    error: string | null
    getAllCategories: () => Promise<void>
    addCategory: (newCategory: Omit<Category, 'id'>) => Promise<void>
    deleteCategory: (id:number) => Promise<void>
    getAssociatedProducts: (id:number) => Promise<void>
    updateCategory: (category: Partial<Category>) =>  Promise<void>
}

const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    associatedProducts: [],
    loading: false,
    error: null,

    getAllCategories: async () => {
        set({loading: true, error: null});   
        try {
            const response = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}categories`);
            if (!response.ok) throw new Error('Network response was not ok');
            const categories = await response.json()
            set({categories: categories, loading: false, error: null});
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to fetch products'
            set({error: errorMessage, loading: false})
        }
    },

    addCategory: async (newCategory: Omit<Category, 'id'>) => {
        console.log(newCategory)
        set({loading: true, error: null})
        try {
            const addCategory = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                },
                body: JSON.stringify(newCategory)
            })
            if (!addCategory.ok) throw new Error('Network response was not ok')
            const createdCategory = await addCategory.json()
            set(state => ({
                categories: [...state.categories, createdCategory],
                loading: false,
                error: null
            }))
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to add category';
            set({ error: errorMessage, loading: false });
        }
    },

    updateCategory: async (category:Partial<Category>) => {
        console.log(category)
        set({loading: true, error: null})
        try {
            const categoryUpdate = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/edit/${category.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                },
                body: JSON.stringify(category)
            })
            if(!categoryUpdate.ok) throw new Error('Network response was not ok')
            const updatedCategory = await categoryUpdate.json()
            console.log(updatedCategory)
            await get().getAllCategories()
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to remove category';
            set({error: errorMessage, loading: false})
        }
    },

    deleteCategory: async (id:number) => {
        set({loading: false, error: null})
        try {
            const deleteCategory = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                }
            })
            if(!deleteCategory.ok) throw new Error('Network response was not ok')
            await get().getAllCategories()
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to remove category';
            set({ error: errorMessage, loading: false });
        }
    },

    getAssociatedProducts: async (id: number) => {
        set({loading: false, error: null})
        try {
            const productsAssociated = await fetch (`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/associated/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN_ADMIN}`
                }
            })
            if (!productsAssociated.ok) throw new Error('Network response was not ok')
            const products = await productsAssociated.json()
            set({associatedProducts: products, loading:false, error: null})
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to remove category';
            set({ error: errorMessage, loading: false });
        }
    },
}))


export default useCategoryStore