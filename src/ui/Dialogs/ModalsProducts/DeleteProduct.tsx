

interface removeProductInterface {
  onClose: () => void,
  deleteProduct: () => void
}
const DeleteProduct = ({onClose, deleteProduct}: removeProductInterface) => {
return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white min-h-40 text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Eliminar producto</h3>
        <div className="flex gap-x-3 justify-end mt-14 text-sm font-medium dark:text-gray-200">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-black/40">Cancelar</button>
          <button onClick={deleteProduct} className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">Eliminar</button>
      </div>
    </div>
  </div>
)
}

export default DeleteProduct