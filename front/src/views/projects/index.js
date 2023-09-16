import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
// import SubCard from 'ui-component/cards/SubCard';

import ProjectDetailsCard from 'views/projects/ProjectDetailsCard';

import { gridSpacing } from 'store/constant';

// const userDetails = {
//     id: '#1Card_Phoebe',
//     avatar: 'avatar-2.png',
//     name: 'Blockscope.net',
//     role: 'Liquid Staking Circular Economy on Sui Network',
//     about: 'Blockscope is Web3 software studio that aims to deliver top notch DeFi and LSDfi applications.',
//     email: 'https://blockscope.net',
//     contact: 'Exclusive NFTs',
//     location: 'LSDfi'
// };

const usersDetails = [
    {
        id: '#1grofi',
        avatar: 'suins_400x400.png',
        name: 'Grofi',
        role: 'Liquid Staking for Circular Economy on Sui Network',
        about: 'Grofi is an LSD dApp developed by Blockscope, a Web3 software studio that aims to deliver top notch DeFi and LSDfi applications.',
        email: 'https://grofi.xyz',
        contact: 'Exclusive NFTs',
        location: 'LSDfi'
    },
    {
        id: '#2cetus',
        avatar: 'cetus_400x400.png',
        name: 'Cetus Protocol',
        role: 'LEmpower Liquidity. Built for DeFi',
        about: 'Cetus is a pioneer DEX and concentrated liquidity protocol built on the Sui and Aptos blockchain. The mission of Cetus is building a powerful and flexible underlying liquidity network to make trading easier for any users and assets',
        email: 'https://www.cetus.zone/',
        contact: 'CETUS and xCETUS tokens',
        location: 'DeFi'
    },
    {
        id: '#5sugarkingdom',
        avatar: 'sugar-kingdom_400x400.png',
        name: 'Sugar Kingdom',
        role: 'Sugar Kingdom is a fantastic match-3 game with metaverse features',
        about: 'A new place of fantasy, where dreams come true. There are great prizes and lots of fun. A king who protects the land of sweetness with his friends',
        email: 'https://www.sugarkingdom.io/',
        contact: 'Limited Edition NFTs',
        location: 'Gaming'
    },
    {
        id: '#7farmwars',
        avatar: 'farm-wars_400x400.png',
        name: 'Farm Wars',
        role: 'Real Time Strategy K2E GAME',
        about: 'Farm Wars is a skill-based real-time strategy game. players will battle other farms and win FW in-game coins. its all about strategy! Whether you take your profits and run or reinvest them in your farm to become stronger its up to you, we dont judge -unless you lose',
        email: 'https://thefarmwars.com/',
        contact: 'In Game NFTs',
        location: 'Gaming'
    },
    {
        id: '#3suins',
        avatar: 'suins_400x400.png',
        name: 'SuiNS',
        role: 'What .Sui domain name do you for your dApp',
        about: 'Sui Name Service or SuiNS is a web3 domain registration service for Sui network, where you can trade .Sui domains',
        email: 'https://suins.io',
        contact: '.Sui domains',
        location: 'DNS'
    },
    {
        id: '#6souffle',
        avatar: 'souffl_400x400.png',
        name: 'Souffl3',
        role: 'THE NFT Market on MOVE',
        about: 'Woohoo! Souffl3 main trading features has launched on Sui Testnet NOW, lets ride the #Suinami wave! 🌊🏄 Join the party of the very 1ST BETA edition of NFT marketplace across',
        email: 'https://souffl3.com/',
        contact: 'NFT Pre-sales Access',
        location: 'NFT'
    },
    {
        id: '#4scallop',
        avatar: 'scallop_400x400.png',
        name: 'Scallop',
        role: 'Scallop is the Next Generation Money Market',
        about: 'Scallop is the Next Generation Money Market which emphasizes institutional-grade quality, enhanced composability, and robust security',
        email: 'https://scallop.io/',
        contact: 'Tokens + NFTs',
        location: 'DeFi'
    }
];

const ProjectsPage = () => (
    <MainCard>
        {/* <MainCard title="Projects Portfolio"> */}
        {/* <Typography variant="body2">Our selection of the finest projects from the SUI ecosystem.</Typography> */}

        <Grid container spacing={gridSpacing} sx={{ mb: 1 }}>
            {/* <Grid item xs={12} lg={4}>
                <ProjectDetailsCard {...userDetails} />
            </Grid> */}
            {usersDetails &&
                usersDetails.map((user) => (
                    <Grid item xs={12} lg={4} key={user.id}>
                        <ProjectDetailsCard {...user} />
                    </Grid>
                ))}
        </Grid>
    </MainCard>
);

export default ProjectsPage;
