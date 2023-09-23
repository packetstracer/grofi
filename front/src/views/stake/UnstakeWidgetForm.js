import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';

import { Box, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect';

import { enqueueSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useWallet } from '@suiet/wallet-kit';

import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

import { getEpoch, setStake } from 'store/slices/stake';

import { getBiggestGasObject, getOsuiObjects, unstakeSui, unwrapStakedSui, convertMistToSui, obfuscateUid } from 'utils/sui/lib';

const orderByBalance = (a, b) => {
    const aBalance = Number(a.content?.fields?.balance);
    const bBalance = Number(b.content?.fields?.balance);

    return aBalance < bBalance ? 1 : bBalance < aBalance ? -1 : 0;
};

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

    const epoch = useSelector((state) => state?.stake?.epoch);

    const [osuiObjects, setOsuiObjects] = useState([]);
    const [selectedOsui, setSelectedOsui] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const scriptedRef = useScriptRef();

    const wallet = useWallet();

    const handleOsuiSelectChange = (event) => {
        setSelectedOsui(osuiObjects[event.target.value]);
    };

    useEffect(() => {
        dispatch(getEpoch());
    }, []);

    useEffect(() => {
        if (!wallet.address || !wallet.address === '') {
            return;
        }

        const getWalletOsuiObjects = async () => {
            const osuiObjects = await getOsuiObjects(wallet);

            setOsuiObjects(
                osuiObjects.sort(orderByBalance).map((osui, i) => ({
                    ...osui,
                    value: i,
                    label: `${convertMistToSui(osui.content?.fields?.balance)} SUI - Id: ${obfuscateUid(osui.objectId)}`
                }))
            );

            setSelectedOsui(osuiObjects[0]);
        };

        getWalletOsuiObjects();
    }, [wallet, submitted]);

    return (
        <Formik
            initialValues={{
                selected: 0,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                selected: Yup.number()
                    .positive()
                    .min(0, 'Option must be selected')
                    .max(osuiObjects.length, 'Option from the select list required')
            })}
            onReset={(values) => {
                values.selected = 0;
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

                    const stakeActivationEpoch = Number(selectedOsui.content.fields.staked_sui.fields.stake_activation_epoch ?? 0);

                    if (stakeActivationEpoch > 0 && stakeActivationEpoch > Number(epoch.epoch)) {
                        displaySnackbar(
                            `oSui cannot be unstaked until activation epoch (current epoch ${epoch.epoch} - activation epoch ${stakeActivationEpoch})`,
                            'error'
                        );
                        return;
                    }

                    const gasObject = await getBiggestGasObject(wallet);

                    if (!gasObject || !gasObject.objectId) {
                        displaySnackbar('SUI gas object not found!', 'error');
                        return;
                    } else if (gasObject.content?.fields?.balance < values.sui + 1) {
                        displaySnackbar(`Need more than ${values.sui + 1} SUI to do the tx!`, 'error');
                        return;
                    }

                    let result = await unwrapStakedSui(wallet, selectedOsui.objectId);
                    console.log('unwrap result', result);
                    result = await unstakeSui(wallet, selectedOsui.content.fields.staked_sui.fields.id.id);
                    console.log('unstake result', result);

                    setSubmitted(submitted + 1);

                    displaySnackbar(`${selectedOsui} oSUI unwrapped successfully`, 'info');

                    dispatch(
                        setStake({
                            staked: values.sui,
                            minted: values.sui
                        })
                    );

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        resetForm();
                    }
                } catch (err) {
                    displaySnackbar('An error ocurred, could not unwrap SUI', 'error');

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
                                    selected="0"
                                    onChange={handleOsuiSelectChange}
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
