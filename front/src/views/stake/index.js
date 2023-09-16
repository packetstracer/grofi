import { Fragment } from 'react';
// import { Typography } from '@mui/material';

import StakeWidget from './StakeWidget';
import StakeStatsCard from './StakeStatsCard';

const StakePage = () => (
    <>
        <StakeStatsCard />
        <StakeWidget />
    </>
);

export default StakePage;
