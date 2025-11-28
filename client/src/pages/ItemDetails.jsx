import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Button } from "@mui/material";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/material/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!item) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  const deleteItem = async () => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/material/${id}`);
      alert("Item deleted successfully");
      navigate("/");
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card style={{ width: "500px", padding: "25px" }}>
        <img
          src={`http://localhost:8080/uploads/${item.image}`}
          alt={item.title}
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <Typography variant="h4" mt={2}>{item.title}</Typography>
        <Typography variant="h5" color="green">₹ {item.price}</Typography>
        <Typography variant="subtitle1" mt={1}>Category: {item.category}</Typography>
        <Typography>Logged User: {userId}</Typography>
        <Typography>Owner User: {item.user}</Typography>


        {userId === item.user && (      // FIXED
          <>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={deleteItem}
              style={{ marginTop: "20px" }}
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit Item
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
}

export default ItemDetails;
