// material-ui
import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://blockscope.net" target="_blank" underline="hover">
            blockscope.net
        </Typography>
    </Stack>
);

export default AuthFooter;
