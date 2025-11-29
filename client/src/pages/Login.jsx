import { useState } from "react";
import axios from "axios";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://${API_BASE_URL}/api/users/login", { email, password });

      // STORE TOKEN + USER DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userId", res.data.user.id);           // <--- FIXED

      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="40px">
      <Card style={{ width: "350px", padding: "25px" }}>
        <Typography variant="h6" align="center" marginBottom="15px">
          Login to Account
        </Typography>
        <form onSubmit={loginHandler}>
          <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" fullWidth label="Password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth style={{ marginTop: "20px" }}>
            Login
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default Login;
