import { create } from "zustand";
import { Category } from "../types";



interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null
    getAllCategories: () => Promise<void>
    addCategory: (newCategory: Omit<Category, 'id'>) => Promise<void>
    deleteCategory: (id:number) => Promise<void>
}

const useCategoryState = create<CategoryState>((set, get) => ({
    categories: [],
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
    addCategory: async (newCategory) => {
        set({loading: true, error: null})
        try {
            const addCategory = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTA5NTc4OSwiZXhwIjoxNzMxMTgyMTg5fQ.QwSrgKf-sPUl8KkUjpdlK_EwXAD_4OtgEWW5VrZNHa8' 
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
    deleteCategory: async (id:number) => {
        set({loading: false, error: null})
        try {
            const deleteCategory = await fetch(`${import.meta.env.VITE_MOBILE_BACKEND_URL}category/delete/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTA5NTc4OSwiZXhwIjoxNzMxMTgyMTg5fQ.QwSrgKf-sPUl8KkUjpdlK_EwXAD_4OtgEWW5VrZNHa8'
                }
            })
            if(!deleteCategory.ok) throw new Error('Network response was not ok')
            await get().getAllCategories()
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to remove category';
            set({ error: errorMessage, loading: false });
        }
    }
}))


export default useCategoryState