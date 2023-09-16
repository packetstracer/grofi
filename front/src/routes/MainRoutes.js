import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const DashboardPage = Loadable(lazy(() => import('views/dashboard/index')));
const StakePage = Loadable(lazy(() => import('views/stake')));
const ProjectsPage = Loadable(lazy(() => import('views/projects')));
const MarketPage = Loadable(lazy(() => import('views/market')));
const NftDetailsPage = Loadable(lazy(() => import('views/market/ProductDetails')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <DashboardPage />
        },
        {
            path: '/dashboard',
            element: <DashboardPage />
        },
        {
            path: '/stake',
            element: <StakePage />
        },
        {
            path: '/projects',
            element: <ProjectsPage />
        },
        {
            path: '/market',
            element: <MarketPage />
        },
        {
            path: '/market/nft/:id',
            element: <NftDetailsPage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
