import { useEffect } from "react"
import useProductsStore from "../../store/useProductsStore"
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GrView } from "react-icons/gr";

const DashboardProducts = () => {
  const {products, getAllProducts, loading, error} = useProductsStore()

  useEffect(() => {
    getAllProducts ()
  }, [getAllProducts])

  console.log(products)
  console.log(loading)
  console.log(error)

  return (
    <section>

      <aside className="sm:flex flex-wrap grid sm:grid-cols-2 grid-cols-1 gap-y-3 items-center gap-x-3 xss:w-[78%] w-[70%] xs:w-[87%] min-h-20 rounded-md mx-3 xs:mx-auto bg-white dark:bg-[#272727] shadow-md mt-7 py-3 px-3 font-semibold text-gray-700">
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
       
        
          <button className="bg-blue-600 p-2 text-[#eee] rounded-md flex items-center"> 
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
          Agregar producto</button>
       
      </aside>

{/*       <div className="flex justify-around mt-5">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <button>Agregar producto</button>
      </div> */}

      <section className="xs:flex justify-center xs:mx-auto w-[100%] md:p-6 px-1 mt-6">
        <div className="xss:w-[80%] xss:ml-2 w-[75%] xs:w-[90%] overflow-x-auto mb-8 rounded-lg shadow-lg dark:shadow-[#444] dark:shadow-md">
          <div className="overflow-x-auto ">
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
                      <button className="text-red-500 sm:text-inherit sm:hover:text-red-500 transition-all duration-300">
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
    </section>
  );
};

export default DashboardProducts;
