const ProductModal = ({ type, product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {type === "view" && "Detalles del Producto"}
          {type === "edit" && "Editar Producto"}
          {type === "delete" && "Eliminar Producto"}
        </h2>

        {type === "view" && (
          <div>
            <p><strong>Nombre:</strong> {product.name}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <img src={product.images[0]} alt={product.name} width="100" />
          </div>
        )}

        {type === "edit" && (
          <form>
            <input type="text" defaultValue={product.name} />
            <input type="number" defaultValue={product.price} />
            <button type="submit">Guardar</button>
          </form>
        )}

        {type === "delete" && (
          <p>¿Seguro que quieres eliminar {product.name}?</p>
        )}

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ProductModal;
