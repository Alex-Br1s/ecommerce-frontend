import { create } from "zustand";
import { User } from "../types";


interface UserState {
    users: User[]
    loading: boolean
    error: string | null
    getAllUsers: () => Promise<void>
}

const useUsersStore = create<UserState>(set => ({
   users: [],
   loading: false,
   error: null,

   getAllUsers: async () => {
    set({ loading: true, error: null })
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjAxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTA4NDA3NCwiZXhwIjoxNzMxMTcwNDc0fQ.Un5251hITTEKKVZiU1nqWRxxuWVFLWdwskrmvlL8_3o'
            }
        })
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