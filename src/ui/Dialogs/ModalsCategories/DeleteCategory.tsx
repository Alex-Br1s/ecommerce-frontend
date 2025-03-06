
import { useEffect } from 'react'
import useCategoryStore from '../../../store/useCategoriesStore'


interface removeCategoryInterface {
  onClose: () => void,
  deleteCategory: () => void,
  categoryId: number | null
}

const DeleteCategory = ({onClose, deleteCategory, categoryId}: removeCategoryInterface) => {
  const {getAssociatedProducts, associatedProducts} = useCategoryStore()

  useEffect(() => {
    if (categoryId !== null) {
      getAssociatedProducts(categoryId)//* Llamamos a la función getAssociatedProducts para saber si tiene productos asociados esa categoria que queremos eliminar 
    }
  }, [categoryId, getAssociatedProducts])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white min-h-36 max-h-[500px] text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md scrollbar-custom">
          <h3 className="text-xl font-bold mb-4">Eliminar categoria</h3>
            {associatedProducts?.length ? <h1>Productos asociado con la categoria:</h1>: ''}
          <div className='max-h-[260px] overflow-y-auto scrollbar-custom'>
            {associatedProducts?.map(product => (
              <div key={product.id} className='flex items-center my-2'>
               <div className="w-12 h-11 mr-3 rounded-full md:block">
                  <img
                  className="object-contain w-full h-full rounded-full"
                  src={product.images[0]}
                  alt={product.name}
                  />
                </div>
                <p>{product.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-x-3 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-black/40"
            >
              Cancelar
            </button>
            <button
              onClick={deleteCategory} 
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {associatedProducts?.length ? 'Eliminar de todas formas' : 'Eliminar'}
            </button>
          </div>
        </div>
    </div>
    
  )
}

export default DeleteCategory