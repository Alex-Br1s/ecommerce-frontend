import { useEffect } from "react";
import useDarkModeStore from "../store/useDarkModeStore";
import { updateBodyClass } from "../utils/changeMode";


const useDarkMode = () => {

  const { isDark } = useDarkModeStore()

  useEffect(() => {
    updateBodyClass(isDark)
  }, [isDark])

  return isDark
}

export default useDarkMode