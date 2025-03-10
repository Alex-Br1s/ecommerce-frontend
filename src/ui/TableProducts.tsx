import { Product } from "../types";
import TableRow from "./TableRow";

interface TableProductsProps {
  products: Product[];
  onView: (selectedProduct: Product) => void;
  onEdit: (selectedProduct: Product) => void;
  onDelete: (selectedProduct: Product) => void;
}

const TableProducts = ({ products, onView, onEdit, onDelete }: TableProductsProps) => {
  return (
    <section className="xs:flex justify-center xs:mx-auto w-[100%] md:p-6 px-1 mt-3">
      <div className="mx-1 w-[95vw] xs:w-[90%] mb-8 rounded-md shadow-lg dark:shadow-[#444] dark:shadow-md max-h-[70vh] scrollbar-custom">
        <div className="overflow-auto md:max-h-[400px] min-h-[60vh] rounded-md max-h-[70vh] scrollbar-custom">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-left dark:text-gray-300 text-gray-700 dark:bg-[#1c1c1c] bg-gray-100 uppercase border-b dark:border-gray-600 border-gray-300">
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">
                  Producto
                </th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">
                  Precio
                </th>
                <th className="px-4 py-3 border-r dark:border-gray-600 border-gray-300">
                  Stock
                </th>
                <th className="px-4 py-3 dark:border-gray-600 border-gray-300">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="dark:bg-[#1c1c1c] bg-white">
              {products.map((product) => (
               <TableRow 
               key={product.id}
               product={product}
               onView={onView}
               onEdit={onEdit}
               onDelete={onDelete}
               />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TableProducts;
