import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { usePathname } from 'src/routes/hooks';

import instance from 'src/components/api/api-instance';

import { ProductForm } from 'src/sections/product/form';

// ----------------------------------------------------------------------

const ProductFormPage = () =>{

  const [currentData, setCurrentData] = useState();

  const pathname = usePathname();

  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');
  
  useEffect(() => {
    const getData = async () => {
      await instance.get(`Products/${id}`).then(({data}) => setCurrentData(data)).catch(err => console.log(err))
    }
    if(id){
      getData();
    }
  },[id]);
  
  return (
    <>
      <Helmet>
        <title> Product | {isEdit ? 'Update' : 'Create'} </title>
      </Helmet>

      <ProductForm isEdit={isEdit} currentData ={currentData} />
    </>
  )
}
export default ProductFormPage