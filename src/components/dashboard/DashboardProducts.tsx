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
      <aside className="flex items-center gap-x-5 w-[95%] h-20 rounded-md mx-auto bg-white shadow-md mt-7 py-3 px-5 font-semibold text-gray-700">
        
        <div className="relative">
          <div className="absolute top-2 flex items-center pl-2">
            <IoIosSearch className="text-2xl text-gray-400 cursor-pointer" />
          </div>
          <input className="pl-10 h-10 w-50 text-sm bg-[#eee] outline-none rounded-md font-normal" type="text" placeholder='Buscar producto...' />
        </div>

        <div className="bg-[#eee] min-w-48 flex items-center gap-x-2 px-3 h-10 rounded-md">
          <p className="text-gray-600 font-normal">Show: </p>
          <select className="bg-transparent text-sm outline-none cursor-pointer">
            <option value="allProducts">All Products</option>
            <option value="figuras">Figuras</option>
            <option value="funkos">Funkos</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      </aside>

      <section className="container mx-auto p-6">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-700 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Precio</th>
                  {/* <th className="px-4 py-3">Activo</th> */}
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="text-gray-600">
                    <td className="px-3 py-1 border">
                      <div className="flex items-center text-base">
                        <div className="w-14 h-14 mr-3 rounded-full md:block">
                          <img
                            className="object-contain w-full h-full rounded-full"
                            src={product.images[0]}
                            alt={product.name}
                          />
                          <div
                            className="rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 text-sm font-semibold border ">${product.price}</td>
                    
                    {/* <td className="px-4 text-sm font-semibold border ">${product.activo}</td> */}
                    
                    <td className="px-4 py-3 text-sm border">
                      <span className={`px-2 py-1 font-semibold leading-tight text-green-700 ${product.stock ? 'text-green-700 bg-green-100' : 'text-red-500 bg-red-100'} bg-green-100 rounded-sm`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-1 text-xl border">
                      <div className="flex gap-x-3">
                      <button className="hover:text-green-600 transition-all duration-300"> <TbEdit /> </button>
                      <button className="hover:text-red-500 transition-all duration-300"> <MdDelete /> </button>
                      <button className="hover:text-blue-500 transition-all duration-300"> <GrView /> </button>
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
