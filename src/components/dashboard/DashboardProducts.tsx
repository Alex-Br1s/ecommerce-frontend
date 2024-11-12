import { useEffect, useState } from "react"
import useProductsStore from "../../store/useProductsStore"
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GrView } from "react-icons/gr";

const DashboardProducts = () => {
  const {products, getAllProducts, deleteProduct, loading, error} = useProductsStore()
  const [productDialogDelete, setProductDialogDelete] = useState(false)
  const [productToDeleteId, setProductToDeleteId] = useState<number | null> (null)

  useEffect(() => {
    getAllProducts ()
  }, [getAllProducts])

  console.log(products)
  console.log(loading)
  console.log(error)

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

  return (
    <section className="h-screen">

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
          <button className="bg-blue-600 p-2 text-[#eee] rounded-md flex justify-center items-center"> 
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

{/*       <div className="flex justify-around mt-5">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <button>Agregar producto</button>
      </div> */}

      <section className="xs:flex justify-center xs:mx-auto w-[100%] md:p-6 px-1 mt-3">
        <div className="mx-1 w-[95vw] xs:w-[90%] mb-8 rounded-lg shadow-lg dark:shadow-[#444] dark:shadow-md">
          <div className="overflow-auto md:max-h-[400px] max-h-[60vh] scrollbar-custom">
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
                  <td className="px-4 text-sm font-semibold border-r dark:text-[#ccc] dark:border-gray-700 border-gray-300 rounded-lg">${product.price}</td>
                  <td className="px-4 py-3 text-sm border-r rounded-lg dark:border-gray-700 border-gray-300">
                    <span className={`px-2 py-1 font-semibold rounded-lg ${product.stock ? 'text-green-700 bg-green-100' : 'text-red-500 bg-red-100'} rounded-sm`}>
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

      {productDialogDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white min-h-40 text-gray-600 dark:text-gray-200 dark:bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Eliminar producto</h3>
            <div className="flex gap-x-3 justify-end mt-14 text-sm font-medium text-gray-700 dark:text-gray-200">
              <button onClick={() => setProductDialogDelete(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-black/40">Cancelar</button>
              <button onClick={confirmDeleteProduct} className="px-4 py-2 border border-transparent rounded-md bg-blue-600 hover:bg-blue-700">Eliminar</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default DashboardProducts;
