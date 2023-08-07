import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiCallWithoutAuth } from '../../utils/http'
import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { delayPromise } from '@/utils/promises';
import * as localStore from '../../utils/localstore'
const defaultTheme = createTheme();

export default function SignUp() {
  const router = useRouter();
  useEffect(() => {
    if(localStore.isLoggedIn()) {
      router.push('/home')
    }
  }, [])
  // if(localStore.isLoggedIn()) {
  //   return <h1>Redirecting to main site</h1>
  // }
  const [popup, setPopup] = useState({
    visible: false,
    msg: "",
    status: "",
  });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const closePopup = () => {
    setPopup({});
  }
  const handleSubmit = async (event) => {
    setDisableSubmit(true);
    debugger;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      EmailAddress: data.get('EmailAddress'),
      Password: data.get('Password'),
      FirstName: data.get('FirstName'),
      LastName: data.get('LastName')
    };
    const res = await apiCallWithoutAuth("post", "/v1/auth/signup", {body: payload});
    setPopup({
      visible: true, 
      msg: res?.message ? res.message : res.status ? "Success": "Something went wrong" ,
      status: res.status ? "success": "error"
    })
    setDisableSubmit(false);
    if(res.status) {
      await delayPromise(1000);
      router.push('/login');
      setTimeout(() => {
        setPopup({});
      }, 6000);
    } 
  };
  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="EmailAddress"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={disableSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={popup.visible} autoHideDuration={6000} onClose={closePopup}>
          <Alert onClose={closePopup} severity={popup.status} sx={{ width: '100%' }}>
            {popup.msg}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}