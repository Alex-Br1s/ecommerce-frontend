import TableActions from "./TableActions";
import { Product } from "../types";

interface TableRowProps {
  product: Product;
  onView: (selectedProduct: Product) => void;
  onEdit: (selectedProduct: Product) => void;
  onDelete: (selectedProduct: Product) => void;
}

const TableRow = ({ product, onView, onEdit, onDelete }: TableRowProps) => {
  
  return (
    <tr className="text-gray-600 border-b dark:border-gray-700 border-gray-300">
      <td className="pl-3 pr-1 py-1 border-r dark:border-gray-700 border-gray-300 rounded-lg">
        <div className="flex items-center text-base">
          <div className="w-12 h-11 mr-3 rounded-full md:block">
            <img
              className="object-contain w-full h-full rounded-full"
              src={product.images[0]}
              alt={product.name} />
          </div>
          <div>
            <p className="font-semibold dark:text-[#ccc]">{product.name}</p>
          </div>
        </div>
      </td>
      <td className="px-4 text-sm font-semibold border-r dark:text-[#ccc] dark:border-gray-700 border-gray-300 rounded-lg">
        {product.salePrice ? (
          <div className="relative inline-block">
            <span className="text-red-700 bg-red-100 p-1 rounded-lg mr-2 relative custom-line-through">
              ${product.price}
            </span>
            <span className="text-green-700 bg-green-100 p-1 rounded-lg">
              ${product.salePrice}
            </span>
          </div>
        ) : (
          <span className="bg-green-100 text-green-700 px-1 py-1 rounded-lg">
            ${product.price}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-sm border-r rounded-lg dark:border-gray-700 border-gray-300">
        <span
          className={`px-2 py-1 font-semibold rounded-lg 
            ${product.stock
              ? "text-green-700 bg-green-100"
              : "text-red-500 bg-red-100"
            }`}>
          {product.stock}
        </span>
      </td>
      <td className="px-4 py-1 text-xl dark:text-[#ccc] dark:border-gray-700 border-gray-300 rounded-lg">
        <TableActions
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default TableRow;
