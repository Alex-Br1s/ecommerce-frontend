import { useEffect, useState } from "react"
import useProductsStore from "../../store/useProductsStore"
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { NewProduct, Product } from "../../types";
import useCategoryState from "../../store/useCategoriesStore";
import AddProduct from "../dialog/modalProducts/AddProduct";
import UpdateProduct from "../dialog/modalProducts/UpdateProduct";
import DetailProduct from "../dialog/modalProducts/DetailProduct";
import DeleteProduct from "../dialog/modalProducts/DeleteProduct";

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
  const {products, getAllProducts, selectedProduct, addProduct, updateProduct, deleteProduct, getOneProduct, clearSelectedProduct, searchProduct, searchedProduct} = useProductsStore()
  const {categories, getAllCategories} = useCategoryState()
  const [productDialogAdd, setProductDialogAdd] = useState(false)
  const [productDialogEdit, setProductDialogEdit] = useState(false)
  const [productDialogDetail, setProductDialogDetail] = useState(false);
  const [productDialogDelete, setProductDialogDelete] = useState(false)
  const [productToUpdateId, setProductToUpdateId] = useState<number | null>(null)
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(null)
  const [productData, setProductData] = useState<NewProduct>(initialProducData);
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    getAllProducts ()
  }, [getAllProducts])

  useEffect(() => {
    getAllCategories ()
  }, [getAllCategories])

  console.log(products)

  //* id: es el id del elemento HTML (por ejemplo, name, price, etc.), y este id se usará como la clave para actualizar el estado.
  //* value: es el valor actual del <input> o <textarea>.
  //* type: indica el tipo de <input> (por ejemplo, text, checkbox, number), y esto permite manejar checkbox de forma especial.
  //* checked: es el valor booleano de un <input> de tipo checkbox (true si está marcado, false si no).
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = event.target;
    
    const valueParsed = type === 'number' ? parseFloat(value) : value

    if (type === 'checkbox') {
      const { checked } = event.target as HTMLInputElement;
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
  }
  
  const closeProductDialogAdd = () => {
    setProductDialogAdd(false)
    setProductData({
      ...productData,
      offer: false
    })
  }

  const createProduct = () => {
    addProduct(productData)
    setProductData(initialProducData)
    setProductDialogAdd(false)
  }

  const openEditProductDialog = (product: Product) => {
    console.log(product)
    setProductToUpdateId(product.id)
    const newProduct: NewProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      images: product.images,
      offer: product.offer,
      salePrice: product.salePrice,
      categoryId: product.categories.map(category => category.id)
    }
    setProductDialogEdit(true)
    setProductData(newProduct)
    console.log(newProduct)
  }

  const closeProductDialogEdit = () => {
    setProductDialogEdit(false)
    setProductData(initialProducData)
  } 

  const productUpdate = () => {
    if (productToUpdateId !== null) {
      updateProduct(productToUpdateId, productData)
      setProductDialogEdit(false)
    }
  }

  const openDetailDialog = (id: number) => {
    setProductDialogDetail(true)
    getOneProduct(id)
  }

  const closeDetailDialog = () => {
    setProductDialogDetail(false)
    clearSelectedProduct()
  }
  
  const openDeleteDialog = (id:number) => {
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

  const removeImage = (index: number) => {
    setProductData((prevData) => ({
      ...prevData,
      // Filter devuelve un nuevo array con los elementos que cumplan la condición (i !== index) === true
      images: prevData.images.filter((_, i) => i !== index)
    }))
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setProductSearch(value)
    if(value.length < 1) {
      searchProduct('')
    }
  }

  const handleSearchProduct = () => {
    searchProduct(productSearch)
  }
  console.log(productSearch)
  console.log(searchedProduct)


  return (
    <section className="min-h-full overflow-y-hidden">

      <aside className="sm:flex flex-wrap grid sm:grid-cols-2 grid-cols-1 gap-y-3 items-center gap-x-3 w-[95vw] xs:w-[86%] min-h-24 rounded-md mx-2 xs:mx-auto bg-white dark:bg-[#272727] shadow-md mt-7 pt-2 pb-1 px-3 font-semibold text-gray-700">

        <div className="relative shadow-md rounded-md dark:shadow-[#1a1a1a] dark:shadow-md">
          <div className="absolute top-2 flex items-center pl-2">
            <IoIosSearch className="text-2xl text-gray-400 cursor-pointer" onClick={handleSearchProduct} />
          </div>
          <input onChange={handleChangeSearch} className="pl-10 h-10 sm:w-48 w-full text-sm bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc] outline-none rounded-md font-normal" type="text" placeholder='Buscar producto...' />
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

        <div className="flex flex-col w-full" /* className="bg-[#eee] dark:bg-[#1f1f1f] min-w-44 flex items-center gap-x-2 px-3 h-10 rounded-md shadow-md dark:shadow-[#666] dark:shadow-md" */>
          <p className="text-gray-600 dark:text-[#bbb] font-normal">Show: </p>
          <select multiple className="text-sm outline-none rounded-md max-h-40 max-w cursor-pointer bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc] scrollbar-custom">
            {categories.map(category => (
              <option key={category.id} className="py-0.5 m-[4px] my-[2px] dark:text-gray-200 text-gray-700 checked:bg-[#ccc] dark:checked:bg-[#444] checked:rounded-md" value={category.categoryName}>{category.categoryName}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Mantenga presionado Ctrl (Windows) o Cmd (Mac) para seleccionar múltiples categorías
          </p>
        </div>

      </aside>

      {productDialogAdd && (
        <AddProduct 
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        productData={productData}
        categories={categories}
        openCloudinaryWidget={openCloudinaryWidget}
        removeImage={removeImage}
        onClose={closeProductDialogAdd}
        createProduct={createProduct}
        /> 
      )}

      {productDialogEdit && (
        <UpdateProduct 
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        productData={productData}
        categories={categories}
        openCloudinaryWidget={openCloudinaryWidget}
        removeImage={removeImage}
        onClose={closeProductDialogEdit}
        updateProduct={productUpdate}
        />
      )}

      {productDialogDetail && (
        <DetailProduct 
        onClose={closeDetailDialog}
        product={selectedProduct || null}
        />
      )}

      {productDialogDelete && (
        <DeleteProduct 
        onClose={() => setProductDialogDelete(false)}
        deleteProduct={confirmDeleteProduct}
        />
      )}

      <section className="xs:flex justify-center xs:mx-auto w-[100%] md:p-6 px-1 mt-3">
        <div className="mx-1 w-[95vw] xs:w-[90%] mb-8 rounded-md shadow-lg dark:shadow-[#444] dark:shadow-md">
          <div className="overflow-auto md:max-h-[400px] min-h-[400px] rounded-md max-h-[60vh] scrollbar-custom">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-left dark:text-gray-300 text-gray-700 dark:bg-[#1c1c1c] bg-gray-100 uppercase border-b dark:border-gray-600 border-gray-300">
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Producto</th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Precio</th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">Stock</th>
                <th className="px-4 py-3 dark:border-gray-600 border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="dark:bg-[#1c1c1c] bg-white">
              {(searchedProduct.length > 0 ? searchedProduct : products).map((product) => (
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
                      <div className="relative inline-block ">
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
                      <button onClick={() => openEditProductDialog(product)} className="text-green-600 sm:text-inherit sm:hover:text-green-600 transition-all duration-300">
                        <TbEdit />
                      </button>
                      <button onClick={() => openDeleteDialog(product.id)} className="text-red-500 sm:text-inherit sm:hover:text-red-500 transition-all duration-300">
                        <MdDelete />
                      </button>
                      <button className="text-blue-500 sm:text-inherit sm:hover:text-blue-500 transition-all duration-300">
                        <GrView onClick={() => openDetailDialog(product.id)} />
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
    </section>
  );
};

export default DashboardProducts;
