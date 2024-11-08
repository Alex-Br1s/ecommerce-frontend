import { useEffect } from 'react'
import useUsersStore from '../../store/useUsersStore'
import { TbEdit } from 'react-icons/tb'
import { MdDelete } from 'react-icons/md'

function DashboardUsers() {

  const {users, getAllUsers, loading, error} = useUsersStore()

  useEffect(() => {
    getAllUsers()
  },[getAllUsers])
  
  console.log(loading)
  console.log(error)

  return (
    <div className="p-1 mt-10 sm:p-5 xs:w-[100%] w-[98%]">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-700">Categorías de Productos</h1>
    
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-auto sm:ml-0"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Agregar Categoría
    </button>
  </div>

  <div className="overflow-x-auto ml-1 bg-white dark:bg-[#272727] shadow-md rounded-lg">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200 dark:bg-[#272727]">
        <tr className="text-sm uppercase font-semibold text-gray-700 dark:text-gray-300">
          <th className="px-2 py-1 text-left tracking-wider whitespace-nowrap">Usuario</th>
          <th className="px-2 py-1 text-left tracking-wider whitespace-nowrap">Activo</th>
          <th className="px-2 py-1 text-left tracking-wider whitespace-nowrap">Role</th>
          <th className="px-2 py-1 text-left tracking-wider whitespace-nowrap">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-[#1c1c1c] font-semibold dark:text-gray-300 text-gray-500">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="pr-6 py-1">
              <div className="flex items-center gap-x-2 pl-2">
                <img className="w-8 rounded-full" src={user.profilePicture} alt={user.firstName} />
                <p className="flex flex-col sm:flex-row gap-x-1 text-xs sm:text-sm">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </p>
              </div>
            </td>
            <td className="px-2 py-1 text-xs sm:text-sm">{user.isActive ? 'Activo' : 'Inactivo'}</td>
            <td className="px-2 py-1 text-xs sm:text-sm">{user.role}</td>
            <td className="px-2 py-1 text-lg flex mt-2 gap-x-2">
              <button className="text-blue-500 hover:text-blue-500">
                <TbEdit />
              </button>
              <button className="text-red-500 hover:text-red-500">
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default DashboardUsers


  {/*  {isAddingUser && (
     <div className="fixed inset-0 z-10 overflow-y-auto">
       <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
         </div>
         <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
         <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
             <div className="sm:flex sm:items-start">
               <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                 <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                   Agregar Nuevo Usuario
                 </h3>
                 <div className="mt-2">
                   <input
                     type="text"
                     placeholder="Nombre"
                     value={newUser.name}
                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                     className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                   />
                   <input
                     type="email"
                     placeholder="Email"
                     value={newUser.email}
                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                     className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                   />
                   <select
                     value={newUser.role}
                     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                     className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                   >
                     <option value="Cliente">Cliente</option>
                     <option value="Administrador">Administrador</option>
                     <option value="Soporte">Soporte</option>
                   </select>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
             <button
               type="button"
               onClick={addUser}
               className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
             >
               Agregar
             </button>
             <button
               type="button"
               onClick={() => setIsAddingUser(false)}
               className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
             >
               Cancelar
             </button>
           </div>
         </div>
       </div>
     </div>
   )} */}