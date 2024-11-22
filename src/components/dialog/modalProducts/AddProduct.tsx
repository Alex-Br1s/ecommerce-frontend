import { FaDeleteLeft } from "react-icons/fa6"
import { NewProduct, Category } from "../../../types"


interface AddProductInterface {
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    productData: NewProduct,
    categories: Category[],
    openCloudinaryWidget: () => void,
    removeImage: (index: number) => void,
    onClose: () => void,
    createProduct: () => void
}

const AddProduct = ({handleChange, handleCategoryChange, productData, categories, openCloudinaryWidget, removeImage, onClose, createProduct}: AddProductInterface) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-[#ddd] dark:bg-[#1f1f1f] overflow-y-auto text-gray-700 dark:text-gray-300 rounded-md min-h-52 xs:max-h-[590px] max-h-[690px] w-full max-w-xl p-4 scrollbar-custom">
    <div className="h-full">
    <h2 className="mb-3 text-xl font-semibold">Crear producto</h2>
    <div className="flex flex-col gap-y-3">
      <label className="text-sm font-medium" htmlFor="name">Nombre</label>
      <input onChange={handleChange} className="h-9 px-2 text-sm text-gray-700 dark:text-gray-200 rounded-md border-b-2 bg-[#eee] dark:bg-[#2f2f2f] border-gray-400" id="name" placeholder="Nombre del producto" />
     
      <label className="text-sm font-medium" htmlFor="price">Precio</label>
      <input onChange={handleChange} className="h-9 px-2 text-sm text-gray-700 dark:text-gray-200 rounded-md border-b-2 bg-[#eee] dark:bg-[#2f2f2f] border-gray-400" min={1} type="number" id="price" placeholder="$ 0.00" />
     
     <div className="flex items-center gap-x-2 my-2">

      <input onChange={handleChange} checked={productData.offer} className="h-4 w-4" id="offer" type="checkbox" />
      <label className="text-sm font-medium" htmlFor="offer">¿Esta en oferta?</label>
      {/* El salePrice solo se aparecera si offer (oferta) es true */}
     </div>
      {
        productData.offer && (
          <div className="flex flex-col">
            <label className="text-sm font-medium" htmlFor="salePrice">Precio de oferta</label>
            <input onChange={handleChange} className="h-9 px-2 text-sm text-gray-700 dark:text-gray-200 rounded-md border-b-2 bg-[#eee] dark:bg-[#2f2f2f] border-gray-400" min={1} type="number" id="salePrice" placeholder="$ 0.00"/>
          </div>
        )
      }
      <label className="text-sm font-medium" htmlFor="description">Descripción</label>
      <textarea onChange={handleChange} max-rows={1} className="h-9 max-h-16 px-2 pt-1 text-sm text-gray-700 dark:text-gray-200 rounded-md border-b-2 bg-[#eee] dark:bg-[#2f2f2f] border-gray-400" id="description" placeholder="Descripción de producto" />
   
      <label className="text-sm font-medium" htmlFor="stock">Stock</label>
      <input onChange={handleChange} className="h-9 px-2 text-sm text-gray-700 dark:text-gray-200 rounded-md border-b-2 bg-[#eee] dark:bg-[#2f2f2f] border-gray-400" min={1} type="number" id="stock" placeholder="1"/>
     
      {categories.length > 0 && (
       <div>
       <label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
         Categorías
       </label>
       <select
         id="categories"
         name="categories"
         multiple
         onChange={handleCategoryChange}
         /* value={selectedCategories}
         onChange={handleCategoryChange} */
         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#ddd] focus:ring-gray-500 focus:border-gray-500 dark:bg-[#1f1f1f] dark:border-gray-600 dark:text-white scrollbar-custom"
       >
         {categories.map((category) => (
           <option key={category.id} value={category.id} className="font-medium dark:text-gray-200 checked:bg-[#ccc] dark:checked:bg-[#444] checked:rounded-md p-0.5 my-0.5">
             {category.categoryName}
           </option>
         ))}
       </select>
       <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
         Mantenga presionado Ctrl (Windows) o Cmd (Mac) para seleccionar múltiples categorías
       </p>
     </div>
     )}
      

      <label className="text-sm font-medium text-gray-500 mt-1" htmlFor="images">Imagenes del producto (max 3)</label>
      {productData.images.length >= 3 ? '' : <button onClick={openCloudinaryWidget} className="px-4 py-2 text-gray-700 font-medium dark:text-gray-200 bg-[#eee] dark:bg-[#2f2f2f] rounded-md text-sm border-b-2 border-gray-400">Elegir imagenes</button>}
    

      {productData.images.length > 0  && (
        <div className="flex gap-x-2">
          {productData.images.map((prevImage, index) => (
            <div key={index} className="flex">
              <div className="relative flex">
                <img src={prevImage} alt='preview' className="h-24 w-24 rounded-md"/>
              <div className="absolute right-0 p-0.5 pr-1 mr-1.5 mt-1 bg-gray-200 rounded-md">
                <FaDeleteLeft onClick={() => removeImage(index)} className="text-xl cursor-pointer text-gray-900"/>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
        
    

    </div>
    <div className="flex justify-end gap-x-3 mt-5">
      <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-600/90 " >Cancelar</button>
      <button onClick={createProduct} className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">Crear producto</button>
    </div>
    </div>
    </div>
  </div>
  )
}

export default AddProduct