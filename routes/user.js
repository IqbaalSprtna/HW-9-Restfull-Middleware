const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/paginate", auth, UserController.get);
router.get("/:id", UserController.getOne);
router.put("/:id", UserController.putRole);
router.delete("/:id", UserController.delete);

module.exports = router;
