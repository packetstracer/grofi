import PropTypes from 'prop-types';
import { useState } from 'react';

import { CardMedia, Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import Lightbox from 'react-18-image-lightbox';

import prod1 from 'assets/images/e-commerce/bear-1.webp';
import prod2 from 'assets/images/e-commerce/bear-2.webp';
import prod3 from 'assets/images/e-commerce/capy-1.svg';
import prod4 from 'assets/images/e-commerce/capy-2.svg';
import prod5 from 'assets/images/e-commerce/capy-3.svg';
import prod6 from 'assets/images/e-commerce/prod-6.png';
import prod7 from 'assets/images/e-commerce/prod-7.png';
import prod8 from 'assets/images/e-commerce/prod-8.png';
import useConfig from 'hooks/useConfig';

const prodImage = require.context('assets/images/e-commerce', true);

const ProductImages = ({ product }) => {
    const { borderRadius } = useConfig();

    const initialImage = product.image ? prodImage(`./${product.image}`) : '';

    const [selected] = useState(initialImage);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <MainCard content={false} sx={{ m: '0 auto' }}>
                        <CardMedia
                            onClick={() => {
                                setModal(!modal);
                                setIsOpen(true);
                            }}
                            component="img"
                            image={selected}
                            sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', cursor: 'zoom-in' }}
                            alt="product images"
                        />
                    </MainCard>
                </Grid>
            </Grid>
            {isOpen && (
                <Lightbox
                    mainSrc={initialImage}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    );
};

ProductImages.propTypes = {
    product: PropTypes.object
};

export default ProductImages;
