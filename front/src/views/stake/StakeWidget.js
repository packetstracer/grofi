import { useDispatch } from 'store';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { FormControl, FormControlLabel, FormGroup, Grid, Stack, Switch, Typography, useMediaQuery } from '@mui/material';

import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

import { resetStake, addGrofiObject, addStakedObject } from 'store/slices/stake';

import StakeWidgetWrapper from './AuthWrapper1';
import StakeWidgetCardWrapper from './AuthCardWrapper';
import StakeWidgetForm from './StakeWidgetForm';
import UnstakeWidgetForm from './UnstakeWidgetForm';

import { useWallet } from '@suiet/wallet-kit';
import { CLIENT_DEFAULT_OPTIONS, SUI_ENV } from 'utils/sui/constant';

const StakeWidget = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const wallet = useWallet();
    const [stakeSelected, setStakeSelected] = useState(false);

    useEffect(() => {
        if (!wallet.address || !wallet.address === '') {
            return;
        }

        const getWalletObjects = async () => {
            const suiClient = new SuiClient({ url: getFullnodeUrl(SUI_ENV) });

            dispatch(resetStake());

            console.log('getWalletObjects : wallet address', wallet.address);

            suiClient
                .getOwnedObjects({
                    owner: wallet.address
                })
                .then((objects) => {
                    objects?.data.map(({ data: object }) => {
                        suiClient
                            .getObject({
                                id: object.objectId,
                                options: CLIENT_DEFAULT_OPTIONS
                            })
                            .then(({ data: objectDetail }) => {
                                if (objectDetail?.type.endsWith('::stake::GrofiStakedSui')) {
                                    dispatch(addGrofiObject(objectDetail));
                                } else if (objectDetail?.type.endsWith('::staking_pool::StakedSui')) {
                                    dispatch(addStakedObject(objectDetail));
                                }
                            });
                    });
                });
        };
        getWalletObjects();
    }, [wallet]);

    return (
        <StakeWidgetWrapper sx={{ mt: 4, mb: 6, borderRadius: 3 }}>
            <Grid container direction="column" justifyContent="flex-end">
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 460px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <StakeWidgetCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item>Toggle switch between stake/unstake</Grid>
                                    <Grid item>
                                        <FormControl>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={<Switch defaultChecked={stakeSelected} />}
                                                    label={!stakeSelected ? 'Stake' : 'Unstake'}
                                                    onChange={() => setStakeSelected(!stakeSelected)}
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </StakeWidgetCardWrapper>
                            <StakeWidgetCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
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
                                                        color={!stakeSelected ? theme.palette.secondary.main : theme.palette.primary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        {!stakeSelected ? 'Liquid Stake SUI' : 'Unstake SUI'}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="14px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        {!stakeSelected
                                                            ? 'Stake your SUI to receive oSUI and earn rewards'
                                                            : 'Unwrap your oSUI to unstake SUI and claim rewards'}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {!stakeSelected ? <StakeWidgetForm /> : <UnstakeWidgetForm />}
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
