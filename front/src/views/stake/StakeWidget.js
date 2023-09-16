// import { Link } from 'react-router-dom';
// import { useSelector } from 'store';
import { useDispatch } from 'store';
import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui.js/faucet';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
// import { MIST_PER_SUI } from '@mysten/sui.js/utils';

import { resetStake, addGrofiObject, addStakedObject } from 'store/slices/stake';

// import UserCountCard from 'ui-component/cards/UserCountCard';

// import { gridSpacing } from 'store/constant';

// import WaterDropIcon from '@mui/icons-material/WaterDrop';
// import InvertColorsIcon from '@mui/icons-material/InvertColors';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import StakeWidgetWrapper from './AuthWrapper1';
import StakeWidgetCardWrapper from './AuthCardWrapper';
import StakeWidgetForm from './StakeWidgetForm';
// import Logo from 'ui-component/Logo';

const MY_ADDRESS = '0xf7a15b559f7055b244da5666da5d4b0a9885dfaf1df3807e342f5d1dde7c57b2';
// const MY_ADDRESS = '0x014d20c259ebd3163fff64b052ec9f80c7c02873a947d361c488be2372f8b2d7';

// const formatBalance = (balance) => {
//     return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
// };

const StakeWidget = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    // const stake = useSelector((state) => state.stake);
    const dispatch = useDispatch();

    useEffect(() => {
        const requestTokensFromFaucet = async () => {
            const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

            // const suiBefore = await suiClient.getBalance({ owner: MY_ADDRESS });
            // console.log(`Balance before faucet: ${formatBalance(suiBefore)} SUI.`);

            // const stakes = suiClient.getStakes({
            //     owner: MY_ADDRESS
            // });
            // stakes.then((res) => {
            //     console.log(res, 'stakes sui...');
            // });

            dispatch(resetStake());

            const objects = suiClient.getOwnedObjects({
                owner: MY_ADDRESS
            });
            objects.then((objects) => {
                objects?.data.map(({ data: object }) => {
                    suiClient
                        .getObject({
                            id: object.objectId,
                            options: {
                                showType: true,
                                showOwner: true,
                                showPreviousTransaction: false,
                                showDisplay: false,
                                showContent: true,
                                showBcs: false,
                                showStorageRebate: false
                            }
                        })
                        .then(({ data: objectDetail }) => {
                            console.log(objectDetail, 'object data...');

                            if (objectDetail?.type.endsWith('::stake::GrofiStakedSui')) {
                                dispatch(addGrofiObject(objectDetail));
                            } else if (objectDetail?.type.endsWith('::staking_pool::StakedSui')) {
                                dispatch(addStakedObject(objectDetail));
                            }
                        });
                });
            });
        };

        requestTokensFromFaucet();
    }, []);

    return (
        <StakeWidgetWrapper sx={{ mt: 4, mb: 6, borderRadius: 3 }}>
            {/* <Grid container justifyContent="center" alignItems="center" spacing={gridSpacing} sx={{ px: 8, pt: 6 }}>
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
            </Grid> */}
            <Grid container direction="column" justifyContent="flex-end">
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 460px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <StakeWidgetCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {/* <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="theme-logo">
                                            <Logo />
                                        </Link>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Stake SUI
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="14px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Stake SUI to receive oSUI and invest into Sui projects
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StakeWidgetForm />
                                    </Grid>
                                </Grid>
                            </StakeWidgetCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </StakeWidgetWrapper>
    );
};

export default StakeWidget;
