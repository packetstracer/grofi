import PropTypes from 'prop-types';
import { useState } from 'react';

import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { gridSpacing } from 'store/constant';
import Avatar from '../../ui-component/extended/Avatar';
import AlertDialogSlide from './AlertDialogSlide';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';

const avatarImage = require.context('assets/images/users', true);

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

const ProjectDetailsCard = ({ id, about, avatar, contact, email, location, name, role }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    console.log('the modal is open ' + open, id, setOpen);

    const theme = useTheme();
    const avatarProfile = avatar && avatarImage(`./${avatar}`);

    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        console.log('opening dialog');
        setOpen(true);
    };

    const handleCloseDialog = () => {
        console.log('closing dialog');
        setOpen(false);
    };

    return (
        <Card
            sx={{
                p: 2,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
                '&:hover': {
                    borderColor: theme.palette.primary.main
                }
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Avatar alt={name} size="lg" src={avatarProfile} />
                        </Grid>
                        <Grid item>
                            <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick} aria-label="more-options">
                                <MoreHorizOutlinedIcon
                                    fontSize="small"
                                    color="inherit"
                                    aria-controls="menu-friend-card"
                                    aria-haspopup="true"
                                    sx={{ opacity: 0.6 }}
                                />
                            </IconButton>
                            {anchorEl && (
                                <Menu
                                    id="menu-user-details-card"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    variant="selectedMenu"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Invest</MenuItem>
                                    <MenuItem onClick={handleClose}>Add to favorites</MenuItem>
                                </Menu>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        {name}
                    </Typography>
                    <Typography variant="caption">{role}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[700], minHeight: 80 }}>
                        {about}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Website</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
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

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                // startIcon={<AttachMoneyIcon />}
                                onClick={handleOpenDialog}
                            >
                                Invest
                            </Button>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Button variant="outlined" color="error" fullWidth startIcon={<MoneyOffIcon />} onClick={handleOpenDialog}>
                                Unstake
                            </Button>
                        </Grid> */}
                    </Grid>
                </Grid>

                <AlertDialogSlide
                    open={open}
                    handleClose={handleCloseDialog}
                    title={name}
                    description={about}
                    contact={contact}
                    location={location}
                    email={email}
                    name={name}
                    role={role}
                    avatar={avatar}
                />
            </Grid>
        </Card>
    );
};

ProjectDetailsCard.propTypes = {
    id: PropTypes.string,
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default ProjectDetailsCard;
