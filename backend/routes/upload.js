const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const router = express.Router();
const upload = multer();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();

router.post("/screenshot", upload.single("file"), (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json({ url: data.Location });
  });
});

module.exports = router;
