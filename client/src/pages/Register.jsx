import { useState } from "react";
import axios from "axios";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      alert("Account Created Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="40px">
      <Card style={{ width: "350px", padding: "25px" }}>
        <Typography variant="h6" align="center" marginBottom="15px">
          Create Account
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField fullWidth label="Name" margin="normal" onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" fullWidth label="Password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth style={{ marginTop: "20px" }}>
            Signup
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default Register;
