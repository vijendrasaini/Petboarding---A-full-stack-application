import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../Redux/actionCreators';



export const Account = () => {
    const dispatch = useDispatch()
    const baseUrl = `https://vijendra-mini-petboard-app.herokuapp.com`
    const dummyUser = {
        email : '',
        password : ''
    }
    const [user, setUser] = useState(dummyUser)
    const inputHandler = (e)=>{
        const { name, value} = e.target
        setUser({ ...user, [name] : value})
    }
    const signIn = async ()=>{
        const url = baseUrl + `signin`
        const response = await fetch(url,{
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'content-type' : 'application/json'
            }
        })
        const finalRespone = await response.json()
        if(!finalRespone.status)
            return alert('Caredentials are wrong')
        localStorage.setItem('token', JSON.stringify(finalRespone.token))
        setUser(dummyUser)
        dispatch(setAuth(true))
    }
    const signUp = async ()=>{
        const url = baseUrl + `/signup`
        console.log(url)
        const response = await fetch(url,{
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'content-type' : 'application/json'
            }
        })
        const finalRespone = await response.json()
        console.log(finalRespone)
        if(!finalRespone.status)
            return alert('Something Bag Happened')
        alert('Please sign in now')
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={inputHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={inputHandler}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={signIn}
                    >
                        Sign In
                    </Button>
                    <Stack
                    alignItems={"center"}
                    >
                    <Typography variant='h6'> Or </Typography>
                    </Stack>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={signUp}
                    >
                        Sign Up
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}