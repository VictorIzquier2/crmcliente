import React from 'react';
import Swal from 'sweetalert2';
import {useMutation, gql} from '@apollo/client';

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id:$id)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Cliente = ({cliente}) => {

  // mutation para eliminar cliente
  const [eliminarCliente] = useMutation (ELIMINAR_CLIENTE, {
    update(cache){
      // obtener una copia del objeto de InMemoryCache 
      const { obtenerClientesVendedor} = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO});

      // Reescribir el cache 
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
        }
      })
    }
  });

  const {nombre, apellido, empresa, email, id} = cliente;

  // Eliminar un cliente 
  const confirmarEliminarCliente = id => {
    Swal.fire({
      title: '¿Estás seguro/a?',
      text: 'No podrás volver atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then(async result => {
      if(result.value){

        //console.log('eliminando ', id);
        try{
          // Eliminar por ID 
          const {data} = await eliminarCliente({
            variables: {
              id
            }
          });
          //console.log(data);
          Swal.fire(
            'Borrado',
            data.eliminarCliente,
            'success'
          )
        }catch(err){
          console.log(err)
        }
      }
    })
  }

  return ( 
    <tr>
      <td className='border px-4 py-2'>{cliente.nombre} {cliente.apellido}</td>
      <td className='border px-4 py-2'>{cliente.empresa}</td>
      <td className='border px-4 py-2'>{cliente.email}</td>
      <td className='border px py-2'>
        <button
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded uppercase text-xs font-bold hover:bg-red-600'
          type='button'
          onClick={() => confirmarEliminarCliente(id)}
        >Eliminar<svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
      </td>
    </tr>
   );
}
 
export default Cliente;