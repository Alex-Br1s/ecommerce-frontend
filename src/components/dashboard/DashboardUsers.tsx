import { useEffect } from "react";
import useUsersStore from "../../store/useUsersStore";

const DashboardUsers = () => {
    const {users, loading, error, getAllUsers} = useUsersStore()

    useEffect(() => {
        getAllUsers()
    },[getAllUsers])
    console.log(users)
    console.log(loading)
    console.log(error)

    return (
      <section className="w-full p-4">
        <table className="w-full border shadow-sm">
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="p-2 text-center rounded-l-lg">Id</th>
              <th className="p-2 text-center">Foto de perfil</th>
              <th className="p-2 text-center">Nombre</th>
              <th className="p-2 text-center">Apellido</th>
              <th className="p-2 text-center rounded-r-lg">Acciones</th>
            </tr>
          </thead>
          <tbody className="mt-3 ">
            <tr>
              <td className="p-2 border-t border-gray-300 text-center">1</td>
              <td className="p-2 border-t border-gray-300 text-center">Mi foto</td>
              <td className="p-2 border-t border-gray-300 text-center">Alex</td>
              <td className="p-2 border-t border-gray-300 text-center">Bris</td>
              <td className="p-2 border-t border-gray-300 text-center">Desactivar</td>
            </tr>
            <tr>
              <td className="p-2 border-t border-gray-300 text-center">1</td>
              <td className="p-2 border-t border-gray-300 text-center">Mi foto</td>
              <td className="p-2 border-t border-gray-300 text-center">Alex</td>
              <td className="p-2 border-t border-gray-300 text-center">Bris</td>
              <td className="p-2 border-t border-gray-300 text-center">Desactivar</td>
            </tr>
            <tr>
              <td className="p-2 border-t border-gray-300 text-center">1</td>
              <td className="p-2 border-t border-gray-300 text-center">Mi foto</td>
              <td className="p-2 border-t border-gray-300 text-center">Alex</td>
              <td className="p-2 border-t border-gray-300 text-center">Bris</td>
              <td className="p-2 border-t border-gray-300 text-center">Desactivar</td>
            </tr>
            {/* Repite las filas según sea necesario */}
          </tbody>
        </table>
      </section>
    );
  };
  

export default DashboardUsers