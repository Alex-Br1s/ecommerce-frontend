import { Product } from "../../../types"


interface DetailProductInterface {
  onClose: () => void
  product: Product | null
}
const DetailProduct = ({onClose, product}: DetailProductInterface) => {
  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#ddd] dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 xs:max-h-[590px] max-h-[670px] w-full max-w-xl p-6 rounded-md overflow-y-auto scrollbar-custom">
      <h1 className="text-2xl mb-5 font-semibold">Detalles del producto</h1>
      <div className="flex flex-col gap-y-3">
          <div>
            <h2 className="text-xl font-medium">Nombre del producto</h2>
            <p className="text-lg">{product?.name}</p>
          </div>
          <hr className="border-gray-400 dark:border-gray-600"/>
          <div className="flex flex-col ">
            <h3 className="text-xl font-medium">Precio</h3>
            {product?.offer ? (
              <div className="mt-1">
                <span className="text-red-700 bg-red-100 p-1 rounded-lg mr-2 relative custom-line-through">${product.price}</span>
                <span className="text-green-700 bg-green-100 p-1 rounded-lg">${product.salePrice}</span>
                <span className={`ml-3 mt-1 ${product?.offer ? 'text-green-600' : '' } `}>{product?.offer ? 'Oferta' : ''}</span>
              </div>
              ) : (
                <p className="text-lg">${product?.price}</p>
              )}
          </div>
        <hr className="border-gray-400 dark:border-gray-600"/>
        <div>
          <h3 className="text-lg font-medium">Descripción</h3>
          <p className="text-sm">{product?.description}</p>
        </div>
        <hr className="border-gray-400 dark:border-gray-600"/>
        <div>
          <h4 className="text-lg font-medium">Stock</h4>
          <p className={`${product?.stock ? 'text-green-600' : 'text-red-500' }`}>{product?.stock} <span>unidades</span></p>
        </div>
        <hr className="border-gray-400 dark:border-gray-600"/>
        <h5 className="text-lg font-medium">Categorias</h5>
        <div className="flex gap-x-1 flex-wrap">
          {product?.categories.map(category => (
            <div key={category.id}>
              <span className="bg-[#bbb] dark:bg-[#2f2f2f] px-2 rounded-xl">{category.categoryName}</span>
            </div>
          ))}   
        </div>
        <hr className="border-gray-400 dark:border-gray-600"/>
        <div className="flex gap-x-2">
          {
            product?.images.map(image => (
              <div>
                <img className='w-32 h-32 rounded-md' src={image} alt="" />
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex justify-end">
        <button className="mt-5 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600" onClick={onClose}>Cerrar</button>
      </div>
      </div>
    </section>
  )
}

export default DetailProduct