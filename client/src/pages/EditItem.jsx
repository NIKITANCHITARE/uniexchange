import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { API_BASE_URL } from "../config";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // ❌ Wrong before:
    // axios.get(`http://${API_BASE_URL}/api/material/${id}`)
    // Reason: Using HTTP causes Mixed Content Errors & http inside backticks creates incorrect URL.

    // ✔ FIX: Directly use API_BASE_URL which already contains https
    axios.get(`${API_BASE_URL}/api/material/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setCategory(res.data.category);
      })
      .catch(err => console.log(err));
  }, [id]);  // 🔥 added id dependency to avoid React warning

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      // ❌ Wrong:
      // axios.put(`http://${API_BASE_URL}/api/material/${id}`)

      // ✔ FIX: Proper URL formatting
      await axios.put(`${API_BASE_URL}/api/material/${id}`, {
        title,
        price,
        category
      });

      alert("Item updated successfully");
      navigate(`/item/${id}`);

    } catch (error) {
      alert("Failed to update");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card style={{ width: "400px", padding: "25px" }}>
        <Typography variant="h6" align="center" mb={2}>
          Edit Item Details
        </Typography>

        <form onSubmit={updateHandler}>
          <TextField fullWidth label="Title" margin="normal"
            value={title} onChange={(e) => setTitle(e.target.value)} />

          <TextField fullWidth label="Price" margin="normal"
            value={price} onChange={(e) => setPrice(e.target.value)} />

          <TextField fullWidth label="Category" margin="normal"
            value={category} onChange={(e) => setCategory(e.target.value)} />

          <Button type="submit" variant="contained" fullWidth style={{ marginTop: "20px" }}>
            Update
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default EditItem;
