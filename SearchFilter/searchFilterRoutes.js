const express = require("express");
const router = express.Router();
const { searchBooks } = require("./searchFilterController");

// Route for searching and filtering books
router.get("/", searchBooks);

module.exports = router;
