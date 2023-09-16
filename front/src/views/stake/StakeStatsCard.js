import { useSelector } from 'store';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

import UserCountCard from 'ui-component/cards/UserCountCard';

import { gridSpacing } from 'store/constant';

import WaterDropIcon from '@mui/icons-material/WaterDrop';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StakeStatsCard = () => {
    const theme = useTheme();
    const stake = useSelector((state) => state.stake);

    return (
        <MainCard>
            <Grid container justifyContent="center" alignItems="center" spacing={gridSpacing} sx={{ px: 8, py: 3 }}>
                <Grid item xs={12} lg={4} sm={8}>
                    <UserCountCard
                        primary="Staked SUI"
                        secondary={stake.staked}
                        iconPrimary={WaterDropIcon}
                        color={theme.palette.primary.dark}
                    />
                </Grid>
                <Grid item xs={12} lg={4} sm={8}>
                    <UserCountCard
                        primary="Minted oSUI"
                        secondary={stake.minted}
                        iconPrimary={InvertColorsIcon}
                        color={theme.palette.secondary.main}
                    />
                </Grid>
                <Grid item xs={12} lg={4} sm={8}>
                    <UserCountCard
                        primary="Rewards GFI"
                        secondary={stake.rewards}
                        iconPrimary={ShoppingCartIcon}
                        color={theme.palette.success.dark}
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StakeStatsCard;
