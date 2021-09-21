const express = require("express");
const {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  Sendmail,
  uploadAvatar,
} = require("../controller/userController");
const { checkEmail, checkNumber, checkEmpty, checkEmailExits, checkLength } = require("../middlewares/checkPattern.validation");
const { uploadImgaesSingle } = require("../middlewares/uploadImages.validation");
const router = express.Router();

// CRUD
router.route("/").get(getAllUser).post(checkEmpty, checkNumber, checkEmail, checkEmailExits, createUser);
router.route("/:id").get(getUser).delete(deleteUser).put(checkEmpty, checkNumber, checkEmail, updateUser);

// UPLOAD
router.route("/uploadAvatar/:id").put(uploadImgaesSingle(), uploadAvatar);
// EMAIL
router.route("/sendmail").post(Sendmail);

// np
module.exports = router;
