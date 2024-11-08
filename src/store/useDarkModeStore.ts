import { create } from "zustand";

interface Mode {
    isDark: boolean;
    setMode: () => void;
}

const useDarkModeStore = create<Mode>((set) => {
    //? Se inicializa isDark desde localStorage y se aplica la clase dark
    const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');

    //? Aplica la clase dark al cargar la pagina guardando asi el estado de isDark haciendo que la pagina se recarge con light o dark.
    if (isDark) document.body.classList.add('dark');

    return {
        isDark,
        setMode: () => set((state) => {
            //*Guardamos el nuevo valor de isDark
            const newMode = !state.isDark;
            //* Y lo cambiamos en el local storage
            localStorage.setItem('isDark', JSON.stringify(newMode));

            //* Si isDark es true entonces agregamos la clase dark al body
            if (newMode) document.body.classList.add('dark');
            //* Y sino lo quitamos
            else document.body.classList.remove('dark');

            //? Y actualizamo el valor isDark
            return { isDark: newMode };
        }),
    };
});

export default useDarkModeStore;
