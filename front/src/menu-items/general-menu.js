// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconBrandChrome, IconVersions, IconCoin, IconBasket } from '@tabler/icons';

// ==============================|| MENU ITEMS -  GENERAL MENU ||============================== //

const icons = {
    IconDashboard,
    IconBrandChrome,
    IconVersions,
    IconCoin,
    IconBasket
};

const generalMenu = {
    id: 'general-menu',
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard-page" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard
        },
        {
            id: 'stake',
            title: <FormattedMessage id="stake-page" />,
            type: 'item',
            url: '/stake',
            icon: icons.IconCoin
        },
        {
            id: 'projects',
            title: <FormattedMessage id="projects-page" />,
            type: 'item',
            url: '/projects',
            icon: icons.IconVersions
        },
        {
            id: 'market',
            title: <FormattedMessage id="market-page" />,
            type: 'item',
            url: '/market',
            icon: icons.IconBasket
        }
        // {
        //     id: 'sample',
        //     title: <FormattedMessage id="sample-page" />,
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconBrandChrome
        // }
    ]
};

export default generalMenu;
