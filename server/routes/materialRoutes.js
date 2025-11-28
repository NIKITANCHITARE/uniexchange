const express = require("express");
const upload = require("../middleware/upload");
const Material = require("../models/Material");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/add", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, price, category } = req.body;

    const newMaterial = new Material({
      title,
      price,
      category,
      image: req.file.filename,
      user: req.user
    });

    await newMaterial.save();

    res.json({ message: "Item Uploaded Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Upload Failed", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const materials = await Material.find().populate("user", "name");
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) return res.status(404).json({ message: "Item not found" });

    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
});


router.get("/:id", async (req, res) => {
  const item = await Material.findById(req.params.id);
  res.json(item);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


module.exports = router;
