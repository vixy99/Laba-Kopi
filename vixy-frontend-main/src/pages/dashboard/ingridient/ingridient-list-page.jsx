import { Helmet } from 'react-helmet-async';

import { IngridientView } from 'src/sections/ingridient/view';

// ----------------------------------------------------------------------

const IngridientListPage = () =>
    <>
      <Helmet>
        <title> Ingridient | List </title>
      </Helmet>

      <IngridientView />
    </>
export default IngridientListPage