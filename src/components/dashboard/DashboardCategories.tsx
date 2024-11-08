import { useState, useEffect } from 'react'
import useCategoryState from '../../store/useCategoriesStore'
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

function DashboardCategories() {

  const {categories, getAllCategories, addCategory, deleteCategory, loading, error} = useCategoryState()

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])
  console.log(loading)
  console.log(error)

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [categoryDialogDelete, setCategoryDialogDelete] = useState(false)
  const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')


  const addNewCategory = () => {
    addCategory({categoryName, description: categoryDescription})
    setCategoryDialogOpen(false)
  }

  const openDeleteDialog = (id:number) => {
    setCategoryToDeleteId(id)
    setCategoryDialogDelete(true)
  }

  const confirmDeleteCategory = () => {
    if (categoryToDeleteId !== null) {
      deleteCategory(categoryToDeleteId)
      setCategoryDialogDelete(false)
      setCategoryToDeleteId(null)
    }
  }

  return (
    <div className="p-1 mt-10 sm:p-5 xs:w-[100%] w-[98%]">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-700">Categorías de Productos</h1>
      
      <button
        onClick={() => setCategoryDialogOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-auto sm:ml-0"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Agregar Categoría
      </button>
    </div>
      <div className="overflow-x-auto ml-1 bg-white dark:bg-[#272727] shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 dark:bg-[#272727] ">
            <tr className='text-sm uppercase font-semibold text-gray-700 dark:text-gray-300'>
              <th className="px-4 py-2 text-left tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left tracking-wider">Descripción</th>
              {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th> */}
              <th className="px-4 py-2 text-left tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1c1c1c] font-semibold dark:text-gray-300 text-gray-500">
            {categories.map((category) => (
              <tr key={category.id} >
                <td className="px-4 py-2">{category.categoryName}</td>
                <td className="px-4 py-2">{category.description}</td>
                {/* <td className="px-4 py-2 whitespace-nowrap">{category.productCount}</td> */}
                <td className="px-4 py-2 text-xl ">
                  <button className="text-blue-500 sm:text-inherit hover:text-blue-500 mr-2">
                    <TbEdit />
                  </button>
                  <button onClick={() => openDeleteDialog(category.id)} className="text-red-500 sm:text-inherit hover:text-red-500">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {categoryDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:bg-inherit rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Descripción
              </label>
              <input
                type="text"
                id="description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:bg-inherit rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setCategoryDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                onClick={addNewCategory} 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Agregar Categoría
              </button>
            </div>
          </div>
        </div>
      )}
      {categoryDialogDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white h-36 text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Eliminar Categoria</h3>
            <div className="flex justify-end space-x-2 mt-10">
              <button
                onClick={() => setCategoryDialogDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteCategory} 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCategories