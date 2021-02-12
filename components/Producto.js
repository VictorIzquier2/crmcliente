import React from 'react';
import Swal from 'sweetalert2';
import {useMutation, gql} from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!){
    eliminarProducto(id: $id)
  }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Producto = ({producto}) => {

  const {nombre, precio, existencia, id}  = producto;

  // Mutation para eliminar productos 
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache){
      const {obtenerProductos} = cache.readQuery({
        query: OBTENER_PRODUCTOS
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
        }
      })
    }
  });

  const confirmarEliminarProducto = () => {
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
          // eliminar producto de la base de datos 
          const {data} = await eliminarProducto({
            variables: {
              id
            }
          });
          //console.log(data);
          Swal.fire(
            'Correcto',
            data.eliminarProducto,
            'success'
          )
        }catch(err){
          console.log(err)
        }
      }
    })
  }

  const editarProducto = () => {
    Router.push({
      pathname: '/editarproducto/[id]',
      query: {id}
    })
  }

  return ( 
    <tr>
      <td className='border px-4 py-2'>{nombre}</td>
      <td className='border px-4 py-2'>{existencia}</td>
      <td className='border px-4 py-2'>{precio}€</td>
      <td className='border px-4 py 2'>
        <button
          className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded uppercase text-xs font-bold hover:bg-red-600'
          type='button'
          onClick={() => editarProducto()}
        >Editar<svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button></td>
      <td className='border px-4 py-2'>
        <button
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded uppercase text-xs font-bold hover:bg-red-600'
          type='button'
          onClick={() => confirmarEliminarProducto()}
        >Eliminar<svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button></td>
    </tr>
   );
}
 
export default Producto;