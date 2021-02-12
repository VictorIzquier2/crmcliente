import React from 'react';
import Layout from '../../components/Layout';
import {useRouter} from 'next/router';
import {useQuery, gql} from '@apollo/client';
import {Formik} from 'formik';
import * as Yup from 'yup';

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      nombre
      precio
      existencia
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();

  const {query: {id}} = router;
  console.log(id);

  const {data, loading, error} = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id
    }
  });

  console.log(data);
  console.log(loading);
  console.log(error);

  if(loading) return 'Cargando...';

  const {obtenerProducto} = data;

  return ( 
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Desde Editar Producto</h1>
      <div className="flex justify-center mt-5">
        <div className='w-full max-w-lg'>
          <Formik>
            <form
              className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
              //onSubmit={formik.handleSubmit}
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                  Nombre
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  type='text'
                  placeholder='Nombre Producto'
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.nombre}
                />
              </div>

              {/*formik.touched.nombre && formik.errors.nombre ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null*/}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencia'>
                  Existencia
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='existencia'
                  type='number'
                  placeholder='Existencia Producto'
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.existencia}
                />
              </div>

              {/*formik.touched.existencia && formik.errors.existencia ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.existencia}</p>
                </div>
              ) : null*/}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                  Precio
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='precio'
                  type='number'
                  placeholder='Precio Producto'
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.precio}
                />
              </div>

              {/*formik.touched.precio && formik.errors.precio ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null*/}

              <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-600'
              value='Registrar producto'
              />

            </form>
          </Formik>
        </div>
      </div>
    </Layout>
   );
}
 
export default EditarProducto;