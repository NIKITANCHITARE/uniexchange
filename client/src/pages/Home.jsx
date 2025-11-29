import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, CardContent, CardActions, Button, Typography, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://${API_BASE_URL}/api/material/all")
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
              <CardMedia 
                component="img" 
                height="200" 
                image={`http://${API_BASE_URL}/uploads/${item.image}`} 
              />
              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1"> ₹{item.price}</Typography>
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
