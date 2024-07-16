import { lazy, 
  // Suspense 
} from 'react';
import { 
  Outlet, 
  Navigate, 
  useRoutes } from 'react-router-dom';
  
  import AuthGuard from 'src/guards/auth-guard';
  import AdminGuard from 'src/guards/admin-guard';
import DashboardLayout from 'src/layouts/dashboard';
// import TransactionCreatePage from 'src/pages/dashboard/transaction/transaction-create';

export const IndexPage = lazy(() => import('src/pages/dashboard/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
// export const HomePage = lazy(() => import('src/pages/landing-page/home/home-page'));

// USER
export const UserPage = lazy(() => import('src/pages/dashboard/user/user-list'));
export const UserCreatePage = lazy(() => import('src/pages/dashboard/user/user-create'));

// UNIT
export const UnitPage = lazy(() => import('src/pages/dashboard/unit/unit-list'));
export const UnitFormPage = lazy(() => import('src/pages/dashboard/unit/unit-form-page'));

// PRODUCT
export const ProductListPage = lazy(() => import('src/pages/dashboard/product/product-list-page'));
export const ProductFormPage = lazy(() => import('src/pages/dashboard/product/product-form-page'));

// PRODUCT FORMULA
export const ProductFormulaListPage = lazy(() => import('src/pages/dashboard/product-formula/product-formula-list-page'));
export const ProductFormulaFormPage = lazy(() => import('src/pages/dashboard/product-formula/product-formula-form-page'));

// INGRIDIENT
export const IngridientListPage = lazy(() => import('src/pages/dashboard/ingridient/ingridient-list-page'));
export const IngridientFormPage = lazy(() => import('src/pages/dashboard/ingridient/ingridient-form-page'));

// INGRIDIENT EXPENDITURE
export const IngridientExpenditureListPage = lazy(() => import('src/pages/dashboard/ingridient-expenditure/ingridient-expenditure-list-page'));
export const IngridientExpenditureFormPage = lazy(() => import('src/pages/dashboard/ingridient-expenditure/ingridient-expenditure-form-page'));

// TRANSACTION
export const TransactionListPage = lazy(() => import('src/pages/dashboard/transaction/transaction-list'));
export const TransactionFormPage = lazy(() => import('src/pages/dashboard/transaction/transaction-create'));

// AUTH
export const LoginPage = lazy(() => import('src/pages/login'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgot-password'));
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path:'/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      path:'dashboard',
      children: [
        { element: <IndexPage />, index: true },
        {
          path:'admin',
          element:(
            <AdminGuard>
              <Outlet />
            </AdminGuard>
          ),
          children:[
            {
              path:'user',
              children : [
                { path: 'list', element: <UserPage /> },
                { path: 'create', element: <UserCreatePage /> },
                { path: ':id/edit', element: <UserCreatePage /> },
              ]
            },
            {
              path:'unit',
              children : [
                { path: 'list', element: <UnitPage /> },
                { path: 'create', element: <UnitFormPage /> },
                { path: ':id/edit', element: <UnitFormPage /> },
              ]
            },
            {
              path:'product',
              children : [
                { path: 'list', element: <ProductListPage /> },
                { path: 'create', element: <ProductFormPage /> },
                { path: ':id/edit', element: <ProductFormPage /> },
              ]
            },
            {
              path:'product-recipe',
              children : [
                { path: 'list', element: <ProductFormulaListPage /> },
                { path: 'create', element: <ProductFormulaFormPage /> },
                { path: ':id/edit', element: <ProductFormulaFormPage /> },
              ]
            },
            {
              path:'ingridient',
              children : [
                { path: 'list', element: <IngridientListPage /> },
                { path: 'create', element: <IngridientFormPage /> },
                { path: ':id/edit', element: <IngridientFormPage /> },
              ]
            },
            {
              path:'ingridient-expenditure',
              children : [
                { path: 'list', element: <IngridientExpenditureListPage /> },
                { path: 'create', element: <IngridientExpenditureFormPage /> },
                { path: ':id/edit', element: <IngridientExpenditureFormPage /> },
              ]
            },
            {
              path:'transaction',
              children : [
                { path: 'list', element: <TransactionListPage /> },
                { path: 'create', element: <TransactionFormPage /> },
              ]
            },
          ]
        },
        {
          path:'kasir',
          element:(
            <AuthGuard>
              <Outlet />
            </AuthGuard>
          ),
          children:[
            {
              path:'transaction',
              children : [
                { path: 'create', element: <TransactionFormPage /> },
              ]
            },
          ]
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPasswordPage />,
        },
        {
          path: 'reset-password',
          element: <ResetPasswordPage />,
        },
      ]
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
