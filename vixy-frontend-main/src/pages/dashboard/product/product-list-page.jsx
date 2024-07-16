import { Helmet } from 'react-helmet-async';

import { ProductView } from 'src/sections/product/view';
// ----------------------------------------------------------------------

const ProductListPage = () =>
    <>
      <Helmet>
        <title> Product | List </title>
      </Helmet>

      <ProductView />
    </>
export default ProductListPage