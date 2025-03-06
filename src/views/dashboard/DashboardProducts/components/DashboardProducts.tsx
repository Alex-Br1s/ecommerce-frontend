import { useState } from "react";
import { Product } from "../../../../types";
import TableProducts from "../../../../ui/TableProducts";
import ProductsActions from "./ProductsActions";

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 150,
    offer: false,
    salePrice: null,
    stock: 10,
    description: "Zapatillas de calidad pa",
    images: [
      "https://example.com/nike-air-max-270.jpg",
      "https://example.com/nike-air-max-270-2.jpg",
    ],
    categories: [{id: 1, categoryName: "zapatillas" }],
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 180,
    offer: true,
    salePrice: 160,
    stock: 5,
    description: "Zapatillas de calidad pa",
    images: [
      "https://example.com/adidas-ultraboost-21.jpg",
      "https://example.com/adidas-ultraboost-21-2.jpg",
    ],
    categories: [{id: 2, categoryName: "zapatillas" }],
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 120,
    offer: false,
    salePrice: null,
    stock: 8,
    description: "Zapatillas de calidad pa",
    images: [
      "https://example.com/puma-rs-x.jpg",
      "https://example.com/puma-rs-x-2.jpg",
    ],
    categories: [{id: 3, categoryName: "zapatillas" }],
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 100,
    offer: true,
    salePrice: 90,
    stock: 12,
    description: "Zapatillas de calidad pa",
    images: [
      "https://example.com/new-balance-574.jpg",
      "https://example.com/new-balance-574-2.jpg",
    ],
    categories: [{id: 4, categoryName: "zapatillas" }],
  },
  {
    id: 5,
    name: "Reebok Classic Leather",
    price: 95,
    offer: true,
    salePrice: 80,
    stock: 15,
    description: "Zapatillas de calidad pa",
    images: [
      "https://example.com/reebok-classic-leather.jpg",
      "https://example.com/reebok-classic-leather-2.jpg",
    ],
    categories: [{id: 5, categoryName: "zapatillas" }],
  },
];

const DashboardProducts = () => {

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalType, setModalType] = useState<"view" | "edit" | "delete" | null>(null);

  const handleOpenModal = (type: "view" | "edit" | "delete", id: number) => {
    console.log('Producto a mostrar, editar o eliminar: ', id);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  const handleView = (id: number) => {
    console.log("Ver detalles de producto con ID: ", id);
  };

  const handleEdit = (id: number) => {
    console.log("Editar producto: ", id);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar producto con ID:", id);
  };

  return (
    <section>
      <ProductsActions />
      <TableProducts
        products={products}
        onView={(id) => handleOpenModal("view", id)}
        onEdit={(id) => handleOpenModal("edit", id)}
        onDelete={(id) => handleOpenModal("delete", id)}
      />
    </section>
  );
};

export default DashboardProducts;
