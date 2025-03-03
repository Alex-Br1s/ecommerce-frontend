import { IoIosSearch } from "react-icons/io"

interface InputSearchProps {
  placeholder?: string
  value: string
  handleChange: (value: string) => void
  onSearchClick: () => void
}

const InputSearch = ({ placeholder, value, handleChange, onSearchClick }: InputSearchProps) => {
  return (
    <section>
      <div className="relative shadow-md rounded-md dark:shadow-[#1a1a1a] dark:shadow-md">
        <div className="absolute top-2 flex items-center pl-2">
          <IoIosSearch
            className="text-2xl text-gray-400 cursor-pointer"
            onClick={onSearchClick} />
        </div>
        <input
          onChange={(e) => handleChange(e.target.value)}
          className="pl-10 h-10 sm:w-48 w-full text-sm bg-[#eee] dark:bg-[#1f1f1f] dark:text-[#ccc] outline-none rounded-md font-normal"
          value={value}
          type="text"
          placeholder={placeholder} />
      </div>
    </section>
  )
}

export default InputSearch
