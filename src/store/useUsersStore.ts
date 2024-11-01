import { create } from "zustand";
import { User } from "../types";


interface UsersState {
    users: User[]
    loading: boolean
    error: string | null
    getAllUsers: () => Promise<void>
}

const useUsersStore = create<UsersState>(set => ({
   users: [],
   loading: false,
   error: null,

   getAllUsers: async () => {
    set({ loading: true, error: null })
    try {
        const response = await fetch('http://localhost:3000/api/users')
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log(data)
        set({loading: false, users: data })
    } catch (error) {
        const errorMessage = (error as Error).message || 'Failed to fetch users';
        set({error: errorMessage, loading: false})
    }
  }
}))

export default useUsersStore