import { Helmet } from 'react-helmet-async';

import ProductsView from 'src/sections/dashboard/kasir/transaction/view/products-view';

// ----------------------------------------------------------------------

export default function TransactionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Transaction | Create </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
