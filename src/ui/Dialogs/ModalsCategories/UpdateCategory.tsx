interface updateCategoryInterface {
  onClose: () => void;
  updateCategory: () => void;
  categoryName: string;
  categoryDescription: string;
  setCategoryName: (value: string) => void;
  setCategoryDescription: (value: string) => void;
}
const UpdateCategory = ({
  onClose,
  updateCategory,
  categoryName,
  categoryDescription,
  setCategoryName,
  setCategoryDescription,
}: updateCategoryInterface) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Actualizar categoría</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            maxLength={30}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:bg-inherit rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Descripción
          </label>
          <input
            type="text"
            id="description"
            maxLength={60}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:bg-inherit rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div className="flex justify-end space-x-2 text-sm">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md font-medium dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-black/40"
          >
            Cancelar
          </button>
          <button
            onClick={updateCategory}
            className="px-4 py-2 border border-transparent rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 "
          >
            Actualizar categoría
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
