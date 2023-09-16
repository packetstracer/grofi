import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'store';

import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from '@mui/material';

import { enqueueSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useWallet, useAccountBalance } from '@suiet/wallet-kit';

import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

import { setStake } from 'store/slices/stake';

const convertBalance = (balance) => {
    const balanceInSui = Number(balance) / 1000000000;
    return Math.round(balanceInSui * 100) / 100;
};

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
                sui: Yup.number().positive().min(1, 'Must stake more than 1 SUI').max(convertBalance(balance), 'Not enough SUI balance')
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
                    <Typography variant="caption">Balance {convertBalance(balance)}</Typography>

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
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
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

                    {/* <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">oSUI</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={'number'}
                            value={values.sui}
                            name="osui"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                            label="oSui"
                            sx={{
                                '& input[type=number]': {
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }
                            }}
                            disabled
                        />
                    </FormControl> */}

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
