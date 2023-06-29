import React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
const PortalAppBar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/auth/login');
    }

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TrueNorth Portal
                </Typography>
                <Button color="inherit" onClick={() => navigate('new')}>New</Button>
                <Button color="inherit" onClick={() => navigate('/')}>Registers</Button>

                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    </Box>
}



export default PortalAppBar;
