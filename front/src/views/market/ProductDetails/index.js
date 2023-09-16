import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Grid } from '@mui/material';

import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';

import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';

import { useDispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { getProduct } from 'store/slices/product';
import { resetCart } from 'store/slices/cart';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-details-tabpanel-${index}`}
            aria-labelledby={`product-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const ProductDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { product } = useSelector((state) => state.product);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getProduct(id)).then(() => setLoading(false));

        // clear cart if complete order
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getProduct(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <Loader />;

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} lg={10}>
                <MainCard>
                    {product && product?.id === Number(id) && (
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <ProductImages product={product} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ProductInfo product={product} />
                            </Grid>
                        </Grid>
                    )}
                </MainCard>
            </Grid>

            <Grid item xs={11} lg={10}>
                <RelatedProducts id={id} />
            </Grid>
        </Grid>
    );
};

export default ProductDetails;
