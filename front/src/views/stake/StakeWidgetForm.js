import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    // Checkbox,
    FormControl,
    // FormControlLabel,
    FormHelperText,
    // Grid,
    // IconButton,
    // InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// import { openSnackbar } from 'store/slices/snackbar';
import { enqueueSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useWallet, useAccountBalance } from '@suiet/wallet-kit';
// import { TransactionBlock } from '@mysten/sui.js';

import AnimateButton from 'ui-component/extended/AnimateButton';
// import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

import { setStake } from 'store/slices/stake';

// assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

const convertBalance = (balance) => {
    const balanceInSui = Number(balance) / 1000000000;
    return Math.round(balanceInSui * 100) / 100;
};

const StakeWidgetForm = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { rewards } = useSelector((state) => state.stake);

    // const { login } = useAuth();
    const scriptedRef = useScriptRef();

    // const [checked, setChecked] = React.useState(true);

    // const [showPassword, setShowPassword] = React.useState(false);
    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const classes = useStyles();

    const wallet = useWallet();
    const { balance } = useAccountBalance();

    return (
        <Formik
            initialValues={{
                // email: '1',
                // password: '1',
                sui: 1,
                osui: 1,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                // password: Yup.string().max(255).required('Password is required'),
                sui: Yup.number().positive().min(1, 'Must stake more than 1 SUI').max(convertBalance(balance), 'Not enough SUI balance')
            })}
            onReset={(values) => {
                values.sui = 1;
                values.osui = 1;
            }}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                    // await login(vNalues.email, values.password);

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
                        <InputLabel htmlFor="outlined-adornment-email-login">SUI</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="number"
                            value={values.sui}
                            name="sui"
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

                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">oSUI</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={'number'}
                            value={values.sui}
                            name="osui"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            // endAdornment={
                            //     <InputAdornment position="end">
                            //         <IconButton
                            //             aria-label="toggle password visibility"
                            //             onClick={handleClickShowPassword}
                            //             onMouseDown={handleMouseDownPassword}
                            //             edge="end"
                            //             size="large"
                            //         >
                            //             {showPassword ? <Visibility /> : <VisibilityOff />}
                            //         </IconButton>
                            //     </InputAdornment>
                            // }
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
                        {/* {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.osui}
                            </FormHelperText>
                        )} */}
                    </FormControl>

                    {/* <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Keep me logged in"
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={
                                    loginProp
                                        ? `/pages/forgot-password/forgot-password${loginProp}`
                                        : '/pages/forgot-password/forgot-password3'
                                }
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid> */}

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Stake
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

StakeWidgetForm.propTypes = {
    loginProp: PropTypes.number
};

export default StakeWidgetForm;
