import { useState } from "react";
import axios from "axios";
import { Box, Card, TextField, Button, Typography } from "@mui/material";

function Upload() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    await axios.post("http://localhost:8080/api/material/add", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      }
    });

    alert("Item Uploaded Successfully!");
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="40px">
      <Card style={{ width: "400px", padding: "25px" }}>
        <Typography variant="h6" align="center" marginBottom="15px">
          Upload Item
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField fullWidth label="Title" margin="normal" onChange={(e) => setTitle(e.target.value)} />
          <TextField fullWidth label="Price" margin="normal" onChange={(e) => setPrice(e.target.value)} />
          <TextField fullWidth label="Category" margin="normal" onChange={(e) => setCategory(e.target.value)} />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ marginTop: "15px" }} />

          <Button type="submit" variant="contained" fullWidth style={{ marginTop: "20px" }}>
            Upload
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default Upload;
