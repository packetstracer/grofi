import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    LinearProgress,
    Rating,
    Slide,
    Typography
} from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';

import Avatar from '../../ui-component/extended/Avatar';
import Chip from 'ui-component/extended/Chip';

import SimpleTabs from './SimpleTabs';

import { gridSpacing } from 'store/constant';

const avatarImage = require.context('assets/images/users', true);

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FacebookWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(66, 103, 178, 0.2)',
    '& svg': {
        color: '#4267B2'
    },
    '&:hover': {
        background: '#4267B2',
        '& svg': {
            color: '#fff'
        }
    }
});

const TwitterWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    '& svg': {
        color: '#1DA1F2'
    },
    '&:hover': {
        background: '#1DA1F2',
        '& svg': {
            color: '#fff'
        }
    }
});

const WebsiteWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(14, 118, 168, 0.12)',
    '& svg': {
        color: '#0E76A8'
    },
    '&:hover': {
        background: '#0E76A8',
        '& svg': {
            color: '#fff'
        }
    }
});

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5
    }
}));

const roundBalance = (balance) => {
    return Math.round(balance);
};

export default function AlertDialogSlide({ open, handleClose, title, description, contact, location, avatar }) {
    const [value, setValue] = useState(4.5);
    const [progress, setProgress] = useState(72);
    const theme = useTheme();

    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress < 95) {
                const diff = Math.random() * 1;
                setProgress(progress + diff);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const avatarProfile = avatar && avatarImage(`./${avatar}`);

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {}}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                {open && (
                    <>
                        <DialogTitle id="alert-dialog-slide-title1">
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs zeroMinWidth>
                                        <Avatar alt={name} size="lg" src={avatarProfile} />
                                    </Grid>

                                    <Grid item>
                                        <Chip label="Active" chipcolor="success" variant="outlined" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs zeroMinWidth sx={{ mt: 2 }}>
                                    <Typography variant="h2" component="span">
                                        {title}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{ mt: 2 }}>
                                    <Rating
                                        name="project-rating"
                                        defaultValue={4.5}
                                        max={5}
                                        precision={0.5}
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description1">
                                <Typography variant="body2" component="span">
                                    {description}
                                </Typography>

                                <Grid container spacing={gridSpacing} sx={{ pt: 1.5 }}>
                                    <Grid item xs={12}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">Investment type</Typography>
                                                    <Typography variant="h6">GFI tokens</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption">ROI</Typography>
                                                <Typography variant="h6">{contact}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption">Sector</Typography>
                                                <Typography variant="h6">{location}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2} sx={{ mb: 1, mt: 0 }}>
                                        <Grid item xs={4}>
                                            <WebsiteWrapper fullWidth aria-label="linkedin">
                                                <LanguageIcon />
                                            </WebsiteWrapper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FacebookWrapper fullWidth aria-label="facebook">
                                                <TelegramIcon />
                                            </FacebookWrapper>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TwitterWrapper fullWidth aria-label="twitter">
                                                <TwitterIcon />
                                            </TwitterWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ pt: 2 }}>
                                    <Grid item xs>
                                        <Typography variant="caption">
                                            Investment Goal: {roundBalance((1000000 * progress) / 100)} / 1.000.000
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ pb: 3 }}>
                                    <Grid item xs>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            color="secondary"
                                            value={progress}
                                            aria-label="secondary color progress"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{Math.round(progress)}%</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <SimpleTabs />
                                </Grid>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button
                                sx={{ color: theme.palette.primary.dark, borderColor: theme.palette.primary.dark }}
                                onClick={handleClose}
                                color="primary"
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}

AlertDialogSlide.propTypes = {
    id: PropTypes.string,
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};
