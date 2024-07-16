// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import MenuBook from '@mui/icons-material/MenuBook';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InventoryIcon from '@mui/icons-material/Inventory';
import StraightenIcon from '@mui/icons-material/Straighten';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    roles: ['KASIR','OWNER','ADMIN']
  },
  {
    title: 'transaction',
    path: '/dashboard/transaction/list',
    icon: <PointOfSaleIcon />,
    roles: ['OWNER','ADMIN']
  },
  {
    title: 'transaction',
    path: 'kasir/transaction/create',
    icon: <PointOfSaleIcon />,
    roles: ['KASIR']
  },
  {
    title: 'user',
    path: 'admin/user/list',
    icon: icon('ic_user'),
    roles: ['OWNER','ADMIN']

  },
  {
    title: 'Unit',
    path: 'admin/unit/list',
    icon: <StraightenIcon />,
    roles: ['OWNER','ADMIN']
  },
  {
    title: 'Product',
    path: 'admin/product/list',
    icon: <AllInboxIcon />,
    roles: ['OWNER','ADMIN']
  },
  {
    title: 'Product Recipe',
    path: 'admin/product-recipe/list',
    icon: <MenuBook />,
    roles: ['OWNER','ADMIN']
  },
  {
    title: 'Ingridient',
    path: 'admin/ingridient/list',
    icon: <WidgetsIcon />,
    roles: ['OWNER','ADMIN']
  },
  {
    title: 'Ingridient Expenditure',
    path: 'admin/ingridient-expenditure/list',
    icon: <InventoryIcon />,
    roles: ['OWNER','ADMIN']
  },
];

export default navConfig;
