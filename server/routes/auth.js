// Step 1 import ..................
const express = require("express");
const router = express.Router();
const { register, login, curentUser } = require("../controllers/auth");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validator");
// import middleware
const { auth } = require('../middlewares/auth')



// @ENDPOINT http://localhost:5000/api/register
// @ACCESS Public
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

// @ACESS Private
router.post("/current-user",auth, curentUser);

// Step 2 Export module
module.exports = router;
