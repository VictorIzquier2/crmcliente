import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import {
  BarChart, Bar, Cell, xAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {gql, useQuery} from '@apollo/client';

const MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      vendedor {
        nombre
        email
      }
      total
    }
  }
`;

const MejoresVendedores = () => {

  const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling])
  
  if(loading) return <h1>Cargando...</h1>
  console.log(data.MejoresVendedores);

  const {mejoresVendedores} = data;

  const vendedorGrafica = [];

  mejoresVendedores.map((vendedor, index) => {
    vendedorGrafica[index] = {
      ...vendedor.vendedor[0],
      total: vendedor.total
    }
  })
  
  return(
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>

      <BarChart
        className='mt-10'
        width={600}
        height={500}
        data={vendedorGrafica}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <xAxis dataKey='nombre'/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey='total' fill='#3182CE'/>
      </BarChart>
    </Layout>
  );
}
export default MejoresVendedores;