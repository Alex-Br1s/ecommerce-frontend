import { Product } from "../../types";
import DetailProduct from "./ModalsProducts/DetailProduct";
//import UpdateProduct from "./ModalsProducts/UpdateProduct";
import DeleteProduct from "./ModalsProducts/DeleteProduct";

interface ProductsModalInterface {
  modalType: string | null;
  product: Product | null;
  onClose: () => void;
  handleDelete: () => void;
}


const ProductsModal = ({ modalType, product, onClose, handleDelete }: ProductsModalInterface) => {
  if (!product || !modalType) return null;
  return (
    <>
     {modalType === "view" && <DetailProduct product={product} onClose={onClose}/>}
   {/*   {modalType === "edit" && <UpdateProduct product={product} onClose={onClose}/>} */}
     {modalType === "delete" && <DeleteProduct onClose={onClose} deleteProduct={handleDelete}/>}
    </>
  );
};

export default ProductsModal;
