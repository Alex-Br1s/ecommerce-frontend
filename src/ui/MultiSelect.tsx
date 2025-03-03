

interface MultiSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
}

const MultiSelect = ({ label, options, selectedValues, onChange, placeholder = "No hay opciones disponibles" }: MultiSelectProps) => {
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    onChange(selectedValues);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-full">
        
        <p className="text-gray-600 dark:text-[#bbb] font-normal">{label}: </p>
        <select
          value={selectedValues}
          onChange={handleSelectChange}
          multiple
          className="text-sm outline-none rounded-md max-h-40 w-full cursor-pointer bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc] scrollbar-custom">
          
          {options.length === 0 && (
            <option disabled value="" className="m-1">
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              className="py-0.5 m-[4px] my-[2px] dark:text-gray-200 text-gray-700 checked:bg-[#ccc] dark:checked:bg-[#444] checked:rounded-md"
              value={option.value}> 
              {option.label}
            </option>
          ))}
        </select>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Mantenga presionado Ctrl (Windows) o Cmd (Mac) para seleccionar
          múltiples categorías o quitar
        </p>
      </div>
    </section>
  );
};

export default MultiSelect;
