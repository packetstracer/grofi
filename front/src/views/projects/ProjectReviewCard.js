import PropTypes from 'prop-types';

import { Divider, Grid, Rating, Stack, Tooltip, Typography } from '@mui/material';

import { format } from 'date-fns';

import Avatar from 'ui-component/extended/Avatar';

import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const avatarImage = require.context('assets/images/users', true);

const ProductReviewCard = ({ avatar, date, name, status, rating, review }) => {
    return (
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={4} lg={3} xl={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={name} src={avatar && avatarImage(`./${avatar}`)} />
                    <Stack spacing={0.5}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography
                                variant="subtitle1"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {name}
                            </Typography>
                            {status && (
                                <Tooltip title="Purchased Verified">
                                    <VerifiedUserIcon fontSize="small" sx={{ color: 'success.dark' }} />
                                </Tooltip>
                            )}
                            {!status && (
                                <Tooltip title="Goodwill">
                                    <DirectionsRunIcon fontSize="small" sx={{ color: 'error.main' }} />
                                </Tooltip>
                            )}
                        </Stack>
                        <Typography variant="caption">{format(new Date(date), 'E, MMM d yyyy')}</Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={11}>
                        <Stack spacing={1}>
                            <Rating
                                size="small"
                                name="simple-controlled"
                                value={rating < 4 ? rating + 1 : rating}
                                icon={<StarTwoToneIcon fontSize="inherit" />}
                                emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                                precision={0.1}
                                readOnly
                            />
                            <Typography variant="body2">{review}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
                <Divider />
            </Grid>
        </Grid>
    );
};

ProductReviewCard.propTypes = {
    avatar: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.bool,
    rating: PropTypes.number,
    review: PropTypes.string
};

export default ProductReviewCard;
