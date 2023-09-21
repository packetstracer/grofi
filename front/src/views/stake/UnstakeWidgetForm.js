import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';

import { Box, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect';

import { enqueueSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useWallet, useAccountBalance } from '@suiet/wallet-kit';

import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

import { setStake, convertBalance } from 'store/slices/stake';

import {
    getBiggestGasObject,
    getObjectsCreatedFromTxResult,
    getOsuiObjects,
    stakeSui,
    stakeOsui,
    convertMistToSui,
    obfuscateUid
} from 'utils/sui/lib';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';

const orderByBalance = (a, b) =>
    a.content?.fields?.balance < b.content?.fields?.balance ? 1 : b.content?.fields?.balance < a.content?.fields?.balance ? -1 : 0;

const displaySnackbar = (msg, level) => {
    enqueueSnackbar(msg, {
        autoHideDuration: 3000,
        variant: level,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transition: 'SlideLeft',
        close: true
    });
};

const UnstakeWidgetForm = ({ ...others }) => {
    const dispatch = useDispatch();
    const { rewards } = useSelector((state) => state.stake);
    const [osuiObjects, setOsuiObjects] = useState([]);

    const scriptedRef = useScriptRef();

    const wallet = useWallet();
    const { balance } = useAccountBalance();

    useEffect(() => {
        if (!wallet.address || !wallet.address === '') {
            return;
        }

        const getWalletOsuiObjects = async () => {
            const osuiObjects = await getOsuiObjects(wallet);
            console.log('osuiObjects ordered', osuiObjects.sort(orderByBalance));
            console.log('osuiObjects', orderByBalance);
            setOsuiObjects(
                osuiObjects.sort(orderByBalance).map((osui, i) => ({
                    value: i,
                    label: `${convertMistToSui(osui.content?.fields?.balance)} SUI - Id: ${obfuscateUid(osui.objectId)}`
                }))
            );
        };
        getWalletOsuiObjects();
        console.log('osuiObjects', osuiObjects);
    }, [wallet]);

    return (
        <Formik
            initialValues={{
                sui: 1,
                osui: 1,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                sui: Yup.number().positive().min(1, 'Must stake more than 1 SUI').max(convertBalance(balance), 'Not enough SUI balance')
            })}
            onReset={(values) => {
                values.sui = 1;
                values.osui = 1;
            }}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                    if (!wallet || !wallet.address) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: 'Wallet not found! Connect wallet and proceed again.' });
                            resetForm();
                        }

                        return;
                    }

                    const gasObject = await getBiggestGasObject(wallet);

                    if (!gasObject || !gasObject.objectId) {
                        displaySnackbar('SUI gas object not found!', 'error');
                    } else if (gasObject.content?.fields?.balance < values.sui + 1) {
                        displaySnackbar(`Need more than ${values.sui + 1} SUI to do the tx!`, 'error');
                    }

                    let result = await stakeSui(wallet, BigInt(values.sui) * MIST_PER_SUI);
                    const objectsCreated = getObjectsCreatedFromTxResult(result);
                    result = await stakeOsui(wallet, objectsCreated[0].objectId);

                    displaySnackbar(`${values.sui} SUI staked successfully and received ${values.sui} oSUI`, 'info');

                    dispatch(
                        setStake({
                            staked: values.sui,
                            minted: values.sui,
                            rewards: rewards + 124
                        })
                    );

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        resetForm();
                    }
                } catch (err) {
                    displaySnackbar('An error ocurred, could not stake SUI', 'error');

                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleSubmit, isSubmitting, touched }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControlSelect
                                    id="outlined-adornment-email-login"
                                    currencies={osuiObjects}
                                    captionLabel="oSui Objects"
                                    selected="1"
                                />
                            </Grid>
                        </Grid>

                        {touched.sui && errors.sui && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.sui}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Unstake
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

UnstakeWidgetForm.propTypes = {
    loginProp: PropTypes.number
};

export default UnstakeWidgetForm;
