import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";
import { apiCallWithoutAuth } from "@/utils/http";
import { useState, useEffect } from "react";
import { delayPromise } from "@/utils/promises";
import * as localStore from '../../utils/localstore'
export default function SignIn() {
  const router = useRouter();
  const [popup, setPopup] = useState({
    visible: false,
    msg: "",
    status: "",
  });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const closePopup = () => {
    setPopup({});
  };
  useEffect(() => {
    if(localStore.isLoggedIn()) {
      router.push('/home')
    }
  }, [])
  // if(localStore.isLoggedIn()) {
  //   return <h1>Redirecting to main site</h1>
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      EmailAddress: data.get("email"),
      Password: data.get("password"),
    };
    const res = await apiCallWithoutAuth("post", "/v1/auth/login", {
      body: payload,
    });
    setPopup({
      visible: true,
      msg: res?.message
        ? res.message
        : res.status
        ? "Success"
        : "Something went wrong",
      status: res.status ? "success" : "error",
    });
    setDisableSubmit(false);
    if (res.status && res.data) {
      localStore.setLocalKey('token', res.data)
      await delayPromise(1000);
      router.push("/home");
      setTimeout(() => {
        setPopup({});
      }, 6000);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            disabled={disableSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
  );
}
