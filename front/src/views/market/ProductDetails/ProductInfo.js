import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Button, ButtonBase, Divider, Grid, Rating, Stack, Table, TableBody, Tooltip, Typography } from '@mui/material';

import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

import Chip from 'ui-component/extended/Chip';
import Avatar from 'ui-component/extended/Avatar';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { addProduct } from 'store/slices/cart';

import CircleIcon from '@mui/icons-material/Circle';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';

const validationSchema = yup.object({
    color: yup.string().required('Color selection is required'),
    size: yup.number().required('Size selection is required.')
});

const Colors = ({ checked, colorsData }) => {
    const theme = useTheme();
    return (
        <Grid item>
            <Tooltip title={colorsData[0].label}>
                <ButtonBase sx={{ borderRadius: '50%' }}>
                    <Avatar
                        color="inherit"
                        size="badge"
                        sx={{
                            bgcolor: colorsData[0].bg,
                            color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800'
                        }}
                    >
                        {checked && (
                            <CircleIcon sx={{ color: theme.palette.mode === 'light' ? 'grey.50' : 'grey.800', fontSize: '0.75rem' }} />
                        )}
                        {!checked && <CircleIcon sx={{ color: colorsData[0].bg, fontSize: '0.75rem' }} />}
                    </Avatar>
                </ButtonBase>
            </Tooltip>
        </Grid>
    );
};

Colors.propTypes = {
    checked: PropTypes.bool,
    colorsData: PropTypes.array
};

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const cart = useSelector((state) => state.cart);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: product.id,
            name: product.name,
            image: product.image,
            salePrice: product.salePrice,
            offerPrice: product.offerPrice,
            color: '',
            size: '',
            quantity: 1
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(addProduct(values, cart.checkout.products));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );

            history('/e-commerce/checkout');
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {' '}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h3">{product.name}</Typography>
                                <Chip size="small" label="New" chipcolor="primary" variant="outlined" />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">{product.description}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">{product.about}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating
                        name="simple-controlled"
                        value={product.rating}
                        icon={<StarTwoToneIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                        precision={0.1}
                        readOnly
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h2" color="primary">
                        {product.offerPrice} oSUI
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={10}>
                                <Table>
                                    <TableBody sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}></TableBody>
                                </Table>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            // startIcon={<ShoppingCartTwoToneIcon />}
                                        >
                                            Buy
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button type="submit" fullWidth color="secondary" variant="contained" size="large">
                                            Borrow
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Grid>
        </Grid>
    );
};

ProductInfo.propTypes = {
    product: PropTypes.object
};

export default ProductInfo;
