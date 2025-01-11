export const updateBodyClass = (isDark: boolean) => {
    //* Si isDark es true entonces agregamos la clase dark al body
    if (isDark) document.body.classList.add('dark')        
    //* Caso contrario lo quitamos
    else document.body.classList.remove('dark')
}