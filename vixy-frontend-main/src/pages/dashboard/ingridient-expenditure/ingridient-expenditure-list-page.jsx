import { Helmet } from 'react-helmet-async';

import { IngridientExpenditureView } from 'src/sections/ingridient-expenditure/view';

// ----------------------------------------------------------------------

const IngridientListPage = () =>
    <>
      <Helmet>
        <title> Ingridient Expenditure | List </title>
      </Helmet>

      <IngridientExpenditureView />
    </>
export default IngridientListPage