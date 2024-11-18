import { useEffect, useState } from "react"
import useProductsStore from "../../store/useProductsStore"
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { NewProduct } from "../../types";
import useCategoryState from "../../store/useCategoriesStore";
import { FaDeleteLeft } from "react-icons/fa6";


const DashboardProducts = () => {
  const initialProducData: NewProduct = {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    images: [],
    offer: false,
    salePrice: null,
    categoryId: []
  }
  const {products, getAllProducts, addProduct, deleteProduct} = useProductsStore()
  const {categories, getAllCategories} = useCategoryState()
  const [productDialogAdd, setProductDialogAdd] = useState(false)
  const [productDialogDelete, setProductDialogDelete] = useState(false)
  const [productToDeleteId, setProductToDeleteId] = useState<number | null> (null)
  const [productData, setProductData] = useState<NewProduct>(initialProducData);

  useEffect(() => {
    getAllProducts ()
  }, [getAllProducts])

  console.log(productData)

  //* id: es el id del elemento HTML (por ejemplo, name, price, etc.), y este id se usará como la clave para actualizar el estado.
  //* value: es el valor actual del <input> o <textarea>.
  //* type: indica el tipo de <input> (por ejemplo, text, checkbox, number), y esto permite manejar checkbox de forma especial.
  //* checked: es el valor booleano de un <input> de tipo checkbox (true si está marcado, false si no).
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    
    const valueParsed = type === 'number' ? parseFloat(value) : value

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setProductData((prev) => ({
        ...prev,
        [id]: checked
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [id]: valueParsed
      }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = Array.from(event.target.selectedOptions).map(option => Number(option.value))

    setProductData((prevData) => ({
      ...prevData,
      categoryId: selectedCategory
    }))
  }


  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diwg6vkzb',
        uploadPreset: 'images-ecommerce',
        folder: 'products',
        maxFiles: 3 - productData.images.length
      },
      (error: Error, result: { event: string; info: { secure_url: string; }; }) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
  
          setProductData((prevData) => ({
            ...prevData,
            images: [...prevData.images, imageUrl]
          }));
        }
      }
    );
  
    widget.open();
  };
  
  const openAddDialogProduct = () => {
    setProductDialogAdd(true)
    getAllCategories()
  }
  
  const createProduct = () => {
    addProduct(productData)
    setProductData(initialProducData)
    setProductDialogAdd(false)
  }

  const openDeleteProductDialog = (id:number) => {
    setProductToDeleteId(id)
    setProductDialogDelete(true)
  }
  
  const confirmDeleteProduct = () => {
    if (productToDeleteId !== null) {
      deleteProduct(productToDeleteId)
      setProductDialogDelete(false)
      setProductToDeleteId(null)
    }
  }

  const closeProductDialogAdd = () => {
    setProductDialogAdd(false)
    setProductData({
      ...productData,
      offer: false
    })
  }

  const removeImage = (index: number) => {
    setProductData((prevData) => ({
      ...prevData,
      // Filter devuelve un nuevo array con los elementos que cumplan la condición (i !== index) === true
      images: prevData.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <section className="h-screen overflow-hidden">

      <aside className="sm:flex flex-wrap grid sm:grid-cols-2 grid-cols-1 gap-y-3 justify-center items-center gap-x-3 w-[95vw] xs:w-[86%] min-h-24 rounded-md mx-2 xs:mx-auto bg-white dark:bg-[#272727] shadow-md mt-7 py-3 px-3 font-semibold text-gray-700">
        <div className="relative shadow-md rounded-md dark:shadow-[#1a1a1a] dark:shadow-md">
          <div className="absolute top-2 flex items-center pl-2">
            <IoIosSearch className="text-2xl text-gray-400 cursor-pointer" />
          </div>
          <input className="pl-10 h-10 sm:w-48 w-full text-sm bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc] outline-none rounded-md font-normal" type="text" placeholder='Buscar producto...' />
        </div>

        <div className="bg-[#eee] dark:bg-[#1f1f1f] min-w-44 flex items-center gap-x-2 px-3 h-10 rounded-md shadow-md dark:shadow-[#666] dark:shadow-md">
          <p className="text-gray-600 dark:text-[#bbb] font-normal">Show: </p>
          <select className="text-sm outline-none cursor-pointer bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc]">
            <option value="allProducts">All Products</option>
            <option value="figuras">Figuras</option>
            <option value="funkos">Funkos</option>
            <option value="anime">Anime</option>
          </select>
        </div>

        <div className="bg-[#eee] dark:bg-[#1f1f1f] min-w-44 flex items-center gap-x-2 px-3 h-10 rounded-md shadow-md dark:shadow-[#666] dark:shadow-md">
          <p className="text-gray-600 dark:text-[#bbb] font-normal">Ordenar por: </p>
          <select className="text-sm outline-none cursor-pointer bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc]">
            <option value="allProducts">Default</option>
            <option value="allProducts">Mayor precio</option>
            <option value="figuras">menor Precio</option>
            <option value="funkos">A-z</option>
            <option value="anime">Z-a</option>
          </select>
        </div>
       
        
        <div className="sm:flex flex-wrap grid sm:grid-cols-2 grid-cols-1">
          <button onClick={openAddDialogProduct} className="bg-blue-600 p-2 text-[#eee] rounded-md flex justify-center items-center"> 
          <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>  
          Agregar producto</button>
        </div>
      </aside>

      <section className="xs:flex justify-center xs:mx-auto w-[100%] md:p-6 px-1 mt-3">
        <div className="mx-1 w-[95vw] xs:w-[90%] mb-8 rounded-md shadow-lg dark:shadow-[#444] dark:shadow-md">
          <div className="overflow-auto md:max-h-[400px] rounded-md max-h-[60vh] scrollbar-custom">
          <table className="w-full min-w-[500px] ">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-left dark:text-gray-300 text-gray-700 dark:bg-[#1c1c1c] bg-gray-100 uppercase border-b dark:border-gray-600 border-gray-300">
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Producto</th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Precio</th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Stock</th>
                <th className="px-4 py-3 dark:border-gray-600 border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="dark:bg-[#1c1c1c] bg-white">
              {products.map((product) => (
                <tr key={product.id} className="text-gray-600 border-b dark:border-gray-700 border-gray-300">
                  <td className="pl-3 pr-1 py-1 border-r dark:border-gray-700 border-gray-300 rounded-lg">
                    <div className="flex items-center text-base">
                      <div className="w-12 h-11 mr-3 rounded-full md:block">
                        <img
                          className="object-contain w-full h-full rounded-full"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <p className="font-semibold dark:text-[#ccc]">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 text-sm font-semibold border-r dark:text-[#ccc] dark:border-gray-700 border-gray-300 rounded-lg">
                    {product.salePrice ? (
                      <div className="relative inline-block">
                          <span className="text-red-700 bg-red-100 p-1 rounded-lg mr-2 relative custom-line-through">${product.price}</span>
                          <span className="text-green-700 bg-green-100 p-1 rounded-lg">${product.salePrice}</span>
                        </div>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-1 py-1 rounded-lg">${product.price}</span>
                      )}
                  </td>

                  <td className="px-4 py-3 text-sm border-r rounded-lg dark:border-gray-700 border-gray-300">
                    <span className={`px-2 py-1 font-semibold rounded-lg ${product.stock ? 'text-green-700 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-1 text-xl dark:text-[#ccc] dark:border-gray-700 border-gray-300 rounded-lg">
                    <div className="flex gap-x-3">
                      <button className="text-green-600 sm:text-inherit sm:hover:text-green-600 transition-all duration-300">
                        <TbEdit />
                      </button>
                      <button onClick={() => openDeleteProductDialog(product.id)} className="text-red-500 sm:text-inherit sm:hover:text-red-500 transition-all duration-300">
                        <MdDelete />
                      </button>
                      <button className="text-blue-500 sm:text-inherit sm:hover:text-blue-500 transition-all duration-300">
                        <GrView />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {productDialogAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#ddd] overflow-y-auto text-gray-700 dark:text-gray-300 dark:bg-[#1f1f1f] rounded-md min-h-52 xs:max-h-[590px] max-h-[690px] w-full max-w-xl p-4 scrollbar-custom">
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
            <button onClick={closeProductDialogAdd} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-600/90 " >Cancelar</button>
            <button onClick={createProduct} className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">Crear producto</button>
          </div>
          </div>
          </div>
        </div>
      )}

      {productDialogDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white min-h-40 text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Eliminar producto</h3>
            <div className="flex gap-x-3 justify-end mt-14 text-sm font-medium dark:text-gray-200">
              <button onClick={() => setProductDialogDelete(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-black/40">Cancelar</button>
              <button onClick={confirmDeleteProduct} className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">Eliminar</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default DashboardProducts;
