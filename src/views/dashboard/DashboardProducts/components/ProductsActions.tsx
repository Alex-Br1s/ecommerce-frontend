import { IoIosAdd } from "react-icons/io";
import Select from "../../../../ui/Select";
import { useState } from "react";
import InputSearch from "../../../../ui/InputSearch";
import MultiSelect from "../../../../ui/MultiSelect";
import Button from "../../../../ui/Button";

const options = [
  { value: "allProducts", label: "Default" },
  { value: "price_desc", label: "Mayor precio" },
  { value: "price_asc", label: "Menor precio" },
  { value: "name_asc", label: "A-Z" },
  { value: "name_desc", label: "Z-A" },
];

const categories = [
  { value: "electronics", label: "Electrónica" },
  { value: "fashion", label: "Moda" },
  { value: "home", label: "Hogar" },
  { value: "books", label: "Libros" },
];

const ProductsActions = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleSelectedChange = (selectedValue: string) => {
    console.log("Opción seleccionada:", selectedValue);
    console.log("Valor:", selectedOption);
    setSelectedOption(selectedValue);
  };

  const handleSearchChange = (value: string) => {
    console.log("Escribiendo:", value);
    console.log("Valor:", searchProduct);
    setSearchProduct(value);
  };

  const onSearchClick = () => {
    console.log("Llamado a la api con el valor:", searchProduct);
    setSearchProduct("");
  };

  const handleCategoryChange = (selected: string[]) => {
    console.log("Categoría seleccionada:", selected);
    setSelectedCategory(selected);
    console.log("Valor:", selectedCategory);
    //setSelectedCategory([...selectedCategory, selected]);
  };

  const handleOpenModalAdd = () => {
    console.log("Se abre el modal para agregar un producto");
  };

  return (
    <section>
      <aside className="sm:flex flex-wrap grid sm:grid-cols-2 grid-cols-1 gap-y-3 items-center gap-x-3 w-[95vw] xs:w-[86%] min-h-24 rounded-md mx-2 xs:mx-auto bg-white dark:bg-[#272727] shadow-md mt-7 pt-2 pb-1 px-3 font-semibold text-gray-700">
        
        <InputSearch
          placeholder="Buscar producto"
          value={searchProduct}
          handleChange={handleSearchChange}
          onSearchClick={onSearchClick}
        />

        <Select
          placeHolder="Ordenar por"
          options={options}
          onChange={handleSelectedChange}/>

        <Button
          title="Agregar producto"
          icon={<IoIosAdd className="text-xl" />}
          onClick={handleOpenModalAdd}
          className="bg-blue-600 shadow-md rounded-md dark:shadow-[#1a1a1a]"/>

        <MultiSelect
          label="Mostrar"
          options={categories}
          selectedValues={selectedCategory}
          onChange={handleCategoryChange}/>

      </aside>
    </section>
  );
};

export default ProductsActions;
