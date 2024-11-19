import { useState, useEffect } from 'react'
import useCategoryStore from '../../store/useCategoriesStore'
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import '../../stylesheet/generalStyles.css'
import { Category } from '../../types';
import AddCategoryModal from '../dialog/modalCategories/AddCategory';
import UpdateCategory from '../dialog/modalCategories/UpdateCategory';
import DeleteCategory from '../dialog/modalCategories/DeleteCategory';


function DashboardCategories() {

  const {categories, getAllCategories, updateCategory, addCategory, deleteCategory, loading, error} = useCategoryStore()

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])
  console.log(loading)
  console.log(error)

  const [categoryDialogAdd, setCategoryDialogAdd] = useState(false)
  const [categoryDialogUpdate, setCategoryDialogUpdate] = useState(false)
  const [categoryDialogDelete, setCategoryDialogDelete] = useState(false)
  const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number>()
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')

  const handleAddCategory = (name: string, description: string) => {
    addCategory({categoryName: name,  description})
    setCategoryDialogAdd(false)
  }

  const setInputsUpdate = (category: Category) => {
    setCategoryDialogUpdate(true);
    setCategoryId(category.id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.description);
  };
  
  const handleCategoryUpdate = () => {
    if (categoryId) {
      updateCategory({ id: categoryId, categoryName, description: categoryDescription });
      setCategoryDialogUpdate(false);
      setCategoryName('');
      setCategoryDescription('');
    }
  };

  const closeUpdateCategoryDialog = () => {
    setCategoryDialogUpdate(false);
    setCategoryName(''); 
    setCategoryDescription(''); 
};


  const openDeleteDialog = (id:number) => {
    setCategoryDialogDelete(true)
    setCategoryToDeleteId(id)//* Agregamos el id de la categoria que queremos eliminar al estado
  }

  const handleDeleteCategory = () => {
    if (categoryToDeleteId !== null) {
      deleteCategory(categoryToDeleteId)
      setCategoryDialogDelete(false)
      setCategoryToDeleteId(null)
    }
  }

  return (
    <div className="p-1 mt-10 sm:p-5 xs:w-[100%] w-[98%] h-screen">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center md:mx-6 mx-0 mb-6 gap-4">
      <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-700">Categorías de Productos</h1>
      
      <button
        onClick={() => setCategoryDialogAdd(true)}
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
       {/* Modal para agregar categorias */}
       {categoryDialogAdd && (
        <AddCategoryModal
          onAddCategory={handleAddCategory}
          onClose={() => setCategoryDialogAdd(false)}
        />
      )}
      {/* Modal para actualizar categoria */}
      {categoryDialogUpdate && (
      <UpdateCategory
        onClose={closeUpdateCategoryDialog}
        updateCategory={handleCategoryUpdate}
        categoryName={categoryName}
        categoryDescription={categoryDescription}
        setCategoryName={setCategoryName}
        setCategoryDescription={setCategoryDescription}
        />
      )}
      {/* Modal para eliminar categoria */}
      {categoryDialogDelete && (
        <DeleteCategory 
          deleteCategory={handleDeleteCategory}
          onClose={() => setCategoryDialogDelete(false)}
          categoryId={categoryToDeleteId}
        />
      )}
    </div>
     <div className="overflow-x-auto overflow-y-auto md:max-h-[400px] max-h-[70vh] xs:mx-auto ml-1 xs:w-[95%] w-[95vw] bg-white dark:bg-[#272727] shadow-md rounded-lg scrollbar-custom">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 dark:bg-[#373535]">
            <tr className='text-sm uppercase font-semibold text-gray-700 dark:text-gray-300'>
              <th className="px-4 py-2 text-left tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left tracking-wider">Descripción</th>
              <th className="px-4 py-2 text-left tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1c1c1c] font-semibold dark:text-gray-300 text-gray-500">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-2">{category.categoryName}</td>
                <td className="px-4 py-2">{category.description}</td>
                <td className="px-4 py-2 text-xl">
                  <button onClick={() => setInputsUpdate(category)} className="text-blue-500 sm:text-inherit text-2xl hover:text-blue-500 mr-2">
                    <TbEdit />
                  </button>
                  <button onClick={() => openDeleteDialog(category.id)} className="text-red-500 sm:text-inherit text-2xl hover:text-red-500">
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

export default DashboardCategories