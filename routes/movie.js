const express = require("express");
const router = express.Router();
const MovieContoller = require("../controllers/movieController");

router.get("/paginate", MovieContoller.get);
router.post("/", MovieContoller.create);
router.get("/:id", MovieContoller.getOne);
router.put("/:id", MovieContoller.putGenres);
router.delete("/:id", MovieContoller.delete);

module.exports = router;
