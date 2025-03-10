import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Product } from "../types";

interface TableActionsProps {
  product: Product;
  onView: (selectedProduct: Product) => void;
  onEdit: (selectedProduct: Product) => void;
  onDelete: (selectedProduct: Product) => void;
}

const TableActions = ({ product, onView, onEdit, onDelete }: TableActionsProps) => {
  return (
    <div className="flex gap-x-3">
      <button onClick={() => onEdit(product)} className="text-green-600 sm:text-inherit sm:hover:text-green-600 transition-all duration-300">
        <TbEdit />
      </button>
      <button onClick={() => onDelete(product)} className="text-red-500 sm:text-inherit sm:hover:text-red-500 transition-all duration-300">
        <MdDelete />
      </button>
      <button onClick={() => onView(product)} className="text-blue-500 sm:text-inherit sm:hover:text-blue-500 transition-all duration-300">
        <GrView />
      </button>
    </div>
  );
};

export default TableActions;
