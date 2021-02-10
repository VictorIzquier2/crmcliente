import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {useRouter} from 'next/router'

  const OBTENER_USUARIO = gql`
    query obtenerUsuario{
      obtenerUsuario{
        id
        nombre
        apellido
      }
    }
  `;

const Header = () => {

  // redirigir página a login si abandonas la sesion
  const router = useRouter();

  // Query de Apollo
  const {data, loading, error} = useQuery(OBTENER_USUARIO);

  // Proteger que no accedamos a data antes de tener resultados
  if(loading) return <h1>Cargando...</h1>

  // Si no hay informacion
  if(!data){
    return router.push('/login')
  }

  const {nombre} = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return ( 
    <div className='flex justify-between mb-10'>
      <h1 className='mr-2'>Hola {nombre}</h1>
      <button
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-2 px-2 text-white shadow-md'
        onClick={cerrarSesion}
      >Cerrar Sesión</button>
    </div>
   );
}
 
export default Header;