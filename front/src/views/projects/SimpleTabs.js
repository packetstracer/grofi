import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';

import { useTheme } from '@mui/material/styles';
import { Box, Chip, Grid, Tab, Tabs, Typography } from '@mui/material';

import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import ProjectReview from './ProjectReviewCard';
import { getProductReviews } from 'store/slices/product';

import CustomizedTimeline from './CustomizedTimeline';
import ProjectWidgetForm from './ProjectStakeForm';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function SimpleTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();

    const productState = useSelector((state) => state.product);

    useEffect(() => {
        setReviews(productState.reviews);
    }, [productState]);

    useEffect(() => {
        dispatch(getProductReviews());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                sx={{
                    mb: 0,
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.2,
                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.primary.main
                    },
                    '& a > svg': {
                        mb: '0px !important',
                        mr: 1.1
                    }
                }}
            >
                <Tab component={Link} to="#" icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Info" {...a11yProps(0)} />
                <Tab component={Link} to="#" icon={<LocationOnIcon sx={{ fontSize: '1.3rem' }} />} label="Roadmap" {...a11yProps(1)} />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            ratings{' '}
                            <Chip
                                label="03"
                                size="small"
                                sx={{ color: theme.palette.primary.light, background: theme.palette.primary.main, ml: 1.3 }}
                            />
                        </>
                    }
                    {...a11yProps(2)}
                />
                <Tab component={Link} to="#" icon={<AccountBalanceIcon sx={{ fontSize: '1.3rem' }} />} label="Invest" {...a11yProps(3)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Blockscope is Web3 software studio that aims to deliver top notch DeFi and LSDfi applications for the Sui
                            ecosystem. We work with Move lang because of the security, reliability and ease of adoption. We are degens on
                            the crypto space.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Blockscope is Web3 software studio that aims to deliver top notch DeFi and LSDfi applications for the Sui
                            ecosystem. We work with Move lang because of the security, reliability and ease of adoption. We are degens on
                            the crypto space.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Blockscope is Web3 software studio that aims to deliver top notch DeFi and LSDfi applications for the Sui
                            ecosystem. We work with Move lang because of the security, reliability and ease of adoption. We are degens on
                            the crypto space.
                        </Typography>
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <CustomizedTimeline />
            </TabPanel>

            <TabPanel value={value} index={2}>
                {reviews &&
                    reviews.map((review, index) => (
                        <Grid item xs={12} key={index}>
                            <ProjectReview
                                avatar={review.profile.avatar}
                                date={review.date}
                                name={review.profile.name}
                                status={review.profile.status}
                                rating={review.rating}
                                review={review.review}
                            />
                        </Grid>
                    ))}
            </TabPanel>

            <TabPanel value={value} index={3}>
                <ProjectWidgetForm />
            </TabPanel>
        </>
    );
}
