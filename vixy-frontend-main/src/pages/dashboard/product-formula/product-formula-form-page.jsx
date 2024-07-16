import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { usePathname } from 'src/routes/hooks';

import instance from 'src/components/api/api-instance';

import { ProductFormulaForm } from 'src/sections/dashboard/product-formula/form';

// ----------------------------------------------------------------------

const ProductFormulaFormPage = () =>{

  const [currentData, setCurrentData] = useState();

  const pathname = usePathname();

  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');
  
  useEffect(() => {
    const getData = async () => {
      await instance.get(`product-formulas/${id}`).then(({data}) => setCurrentData(data)).catch(err => console.log(err))
    }
    if(id){
      getData();
    }
  },[id]);
  
  return (
    <>
      <Helmet>
        <title> Product Formula | {isEdit ? 'Update' : 'Create'} </title>
      </Helmet>

      <ProductFormulaForm isEdit={isEdit} currentData ={currentData} />
    </>
  )
}
export default ProductFormulaFormPage