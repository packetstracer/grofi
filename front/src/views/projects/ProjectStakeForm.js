import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'store';

import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';

import { enqueueSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useWallet, useAccountBalance } from '@suiet/wallet-kit';
import { convertMistToSui } from 'utils/sui/lib';

import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

import { setStake } from 'store/slices/stake';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';

const ProjectWidgetForm = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { rewards } = useSelector((state) => state.stake);

    const scriptedRef = useScriptRef();

    const wallet = useWallet();
    const { balance } = useAccountBalance();

    return (
        <Formik
            initialValues={{
                sui: 1,
                osui: 1,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                sui: Yup.number()
                    .positive()
                    .min(1, 'Must stake more than 1 SUI')
                    .max(convertMistToSui(Number(balance)), 'Not enough SUI balance')
            })}
            onReset={(values) => {
                values.sui = 1;
                values.osui = 1;
            }}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                    await wallet.signMessage({
                        message: new TextEncoder().encode(`Stake ${values.sui} SUI and mint ${values.sui} oSUI`)
                    });

                    enqueueSnackbar(`${values.sui} SUI staked successfully and received ${values.sui} oSUI`, {
                        autoHideDuration: 3000,
                        variant: 'info',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        transition: 'SlideLeft',
                        close: true
                    });

                    dispatch(
                        setStake({
                            staked: values.sui * MIST_PER_SUI,
                            minted: values.sui * MIST_PER_SUI,
                            rewards: rewards * MIST_PER_SUI + 124 * MIST_PER_SUI
                        })
                    );

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        resetForm();
                    }
                } catch (err) {
                    console.error(err);

                    enqueueSnackbar('An error ocurred, could not stake SUI', {
                        autoHideDuration: 3000,
                        variant: 'error',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        transition: 'SlideLeft',
                        close: true
                    });

                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, values, touched }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <Typography variant="caption">Balance {convertMistToSui(Number(balance))}</Typography>

                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">oSUI</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="number"
                            value={values.sui}
                            name="sui"
                            label="oSui"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                            sx={{
                                '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0
                                }
                            }}
                        />
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
                            <Button color="success" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Invest in project
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

ProjectWidgetForm.propTypes = {
    loginProp: PropTypes.number
};

export default ProjectWidgetForm;
