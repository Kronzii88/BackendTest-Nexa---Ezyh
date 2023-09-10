const express = require("express");
const router = express.Router();
const authencticate = require("../middlewares/authenticate");
const employeeController = require("../controllers/employeeController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.get("/api/v1/employee", authencticate, employeeController.getAll);
router.post(
  "/api/v1/employee",
  authencticate,
  upload.single("photo"),
  employeeController.create
);
router.patch(
  "/api/v1/employee/:nip",
  authencticate,
  employeeController.updateByNip
);
router.patch(
  "/api/v1/deactivate/:nip",
  authencticate,
  employeeController.deactiveByNip
);

module.exports = router;
