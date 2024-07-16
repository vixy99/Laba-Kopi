import { Helmet } from 'react-helmet-async';

import { UnitView } from 'src/sections/unit/view';

// ----------------------------------------------------------------------

const UnitListPage = () =>
    <>
      <Helmet>
        <title> Unit | List </title>
      </Helmet>

      <UnitView />
    </>
export default UnitListPage