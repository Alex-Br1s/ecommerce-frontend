
interface SelectProps {
  placeHolder: string;
  options: {value: string, label: string}[];
  onChange: (selectedValue: string) => void;
}


const Select = ({placeHolder, options, onChange}: SelectProps) => {
  return (
    <section>
      <div className="bg-[#eee] dark:bg-[#1f1f1f] min-w-44 flex items-center gap-x-2 px-3 h-10 rounded-md shadow-md dark:shadow-[#1a1a1a]">
        <p className="text-gray-600 dark:text-[#bbb] font-normal">
          {placeHolder}:{" "}
        </p>
        <select
          onChange={(e) => onChange(e.target.value)}
          className="text-sm outline-none cursor-pointer bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc]">
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))} 
        </select>
      </div>
    </section>
  );
};

export default Select;
