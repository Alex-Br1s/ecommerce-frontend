import { useEffect } from "react";
import useDarkModeStore from "../store/useDarkModeStore";


const useDarkMode = () => {

  const { isDark } = useDarkModeStore()

  useEffect(() => {
    if (isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDark])

  return isDark
}

export default useDarkMode