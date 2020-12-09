const { Router } = require("express");
const router = Router();

const fileUploader = require("../configs/cloudinary.config");

/* POST - upload images   */
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log(req.file);
  res.status(200).json({ cloudinaryUrl: req.file.path });
});

module.exports = router;
