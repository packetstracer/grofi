import { useTheme } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from '@mui/lab';

// import FastfoodIcon from '@mui/icons-material/FastfoodTwoTone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LaptopMacIcon from '@mui/icons-material/LaptopMacTwoTone';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// import HotelIcon from '@mui/icons-material/HotelTwoTone';
import RepeatIcon from '@mui/icons-material/RepeatTwoTone';

export default function CustomizedTimeline() {
    const theme = useTheme();
    const paper = {
        p: 2.5,
        boxShadow: 'none',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        border: '1px dashed',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.dark
    };
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        Nov 1th, 2023
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <LaptopMacIcon sx={{ color: '#fff' }} />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} sx={paper}>
                        <Typography variant="h5" component="h1">
                            Registration
                        </Typography>
                        {/* <Typography>KYC / KYB</Typography> */}
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        Dec 1th, 2023
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <AttachMoneyIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} sx={paper}>
                        <Typography variant="h5" component="h1">
                            Funding starts
                        </Typography>
                        {/* <Typography>Because it&apos;s awesome!</Typography> */}
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        Jan 1th, 2024
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <MoneyOffIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} sx={paper}>
                        <Typography variant="h5" component="h1">
                            Funding ends
                        </Typography>
                        {/* <Typography>Because you need rest</Typography> */}
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        March 1th, 2023
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <RepeatIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} sx={paper}>
                        <Typography variant="h5" component="h1">
                            Assets distribution
                        </Typography>
                        <Typography>Token and NFT listing</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}
