import { Helmet } from 'react-helmet-async';

import { ProductFormulaView } from 'src/sections/dashboard/product-formula/view';

// ----------------------------------------------------------------------

const ProductFormulaListPage = () =>
    <>
      <Helmet>
        <title> Product Formula | List </title>
      </Helmet>

      <ProductFormulaView />
    </>
export default ProductFormulaListPage