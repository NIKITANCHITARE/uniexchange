import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2", paddingY: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Logo + Title */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#fff",
            fontWeight: 700,
            gap: 1,
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            UniExchange
          </Typography>
        </Box>

        {/* Menu Buttons */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/add">Add Item</Button>

          {user ? (
            <>
              <Typography sx={{ color: "white", fontWeight: 600 }}>
                Welcome, {user.name}
              </Typography>
              <Button onClick={handleLogout} variant="contained" color="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button variant="contained" color="secondary" component={Link} to="/register">
                Signup
              </Button>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
