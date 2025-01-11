import { create } from "zustand";
import { updateBodyClass } from "../utils/changeMode";

interface Mode {
    isDark: boolean;
    setMode: () => void;
}

const useDarkModeStore = create<Mode>((set) => {
    //? Se inicializa isDark desde localStorage y se aplica la clase dark
    const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');
    updateBodyClass(isDark)


    return {
        isDark,
        setMode: () => set((state) => {
            //*Guardamos el nuevo valor de isDark
            const newMode = !state.isDark;
            //* Y lo cambiamos en el local storage
            localStorage.setItem('isDark', JSON.stringify(newMode));

            updateBodyClass(newMode)

            //? Y actualizamo el valor isDark
            return { isDark: newMode };
        }),
    };
});

export default useDarkModeStore;
