import { useTheme, styled } from '@mui/material/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { IconBrandDrops, IconDroplet } from '@tabler/icons';

import { useWallet } from '@suiet/wallet-kit';

const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const WalletList = () => {
    const theme = useTheme();

    const { select, allAvailableWallets } = useWallet();
    console.log('Suiet wallet hook', allAvailableWallets);

    const handleConnect = (wallet) => {
        if (!wallet.installed) {
            return;
        }

        console.log('wallet is installed', wallet);

        select(wallet.name);
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 1,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <ListItemWrapper>
                <ListItem alignItems="center" sx={{ mx: 3 }} onClick={() => handleConnect(allAvailableWallets[1])}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: theme.palette.primary.dark,
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                                border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
                                borderColor: theme.palette.primary.main
                            }}
                        >
                            <IconDroplet stroke={1.5} size="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Sui Wallet</Typography>} />
                </ListItem>
            </ListItemWrapper>

            <ListItemWrapper>
                <ListItem alignItems="center" sx={{ mx: 3 }} onClick={() => handleConnect(allAvailableWallets[0])}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: theme.palette.primary.dark,
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                                border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
                                borderColor: theme.palette.primary.main
                            }}
                        >
                            <IconBrandDrops stroke={1.5} size="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Suiet</Typography>} />
                </ListItem>
            </ListItemWrapper>
        </List>
    );
};

export default WalletList;
