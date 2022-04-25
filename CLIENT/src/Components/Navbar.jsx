import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../Redux/actionCreators';


export const Navbar = () => {
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function signIn() {
        window.location.href = "/signin"
    }
    function logOut(){
        localStorage.removeItem('token')
        dispatch(setAuth(false))
    }
    return (
        <>

            <Box sx={{ flexGrow: 1, width: "80%", margin: "auto" }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" ><MenuIcon /></IconButton>
                        <Stack
                            direction={"row"}
                            justifyContent="space-between"
                            alignContent={"center"}
                            sx={{ width: "100%" }}
                        >
                            <Typography variant="h5"><Link style={{ color: "black", textDecoration: "none" }} to={"/"}>PET-BOARDING</Link></Typography>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={4}
                            >
                                <Link to='/listing/create' style={{ color: "white", fontSize: 20, textDecoration: "none" }}>Add a pet house</Link>
                                <Link to='/' style={{ color: "white", fontSize: 20, textDecoration: "none" }}>Help</Link>
                                <Link to='' style={{ color: "white", fontSize: 20, textDecoration: "none" }}>
                                    {
                                        !auth ? <>
                                            <Button variant="contained" color='success' onClick={signIn}>Login</Button>
                                        </>
                                            :
                                            <PopupState variant="popover" popupId="demo-popup-menu">
                                                {(popupState) => (
                                                    <>
                                                        <Button variant="contained" color='success' {...bindTrigger(popupState)}>
                                                            Dashboard
                                                        </Button>
                                                        <Menu {...bindMenu(popupState)}>
                                                            <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                                            <MenuItem onClick={popupState.close}>My account</MenuItem>
                                                            <MenuItem onClick={logOut}>Logout</MenuItem>
                                                        </Menu>
                                                    </>
                                                )}
                                            </PopupState>
                                    }
                                </Link>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
