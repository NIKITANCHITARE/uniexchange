import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, CardContent, CardActions, Button, Typography, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ❌ WRONG BEFORE:
    // axios.get("http://${API_BASE_URL}/api/material/all")
    // Reason: Using " " prevents template variable usage && http causes mixed content error

    // ✔ FIX: Use backticks & API_BASE_URL with https
    axios.get(`${API_BASE_URL}/api/material/all`)
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 4, px: 3 }}>
      <Typography variant="h5" align="center" marginBottom="20px" fontWeight="bold">
        Latest Posted Items
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {items.map((item) => (
          <Grid item key={item._id}>
            <Card sx={{ width: 250, borderRadius: 2 }}>

              {/* ❌ WRONG Before:
                image={`http://${API_BASE_URL}/uploads/${item.image}`}
                 Correct reason: image must load from HTTPS backend not HTTP
              */}

              {/* ✔ FIXED Image URL */}
              <CardMedia
                component="img"
                height="200"
                image={`${API_BASE_URL}/uploads/${item.image}`}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1">₹{item.price}</Typography>
                <Chip label={item.category} sx={{ mt: 1 }} />
              </CardContent>

              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/item/${item._id}`)}
                >
                  View
                </Button>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
