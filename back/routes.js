const express = require("express");
const router = express.Router();
const userController = require("./constrollers/userController");
const path = require('path');

router.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'index.html'));
});


router.get("/user", userController.getAll);
router.post("/user", userController.create);
router.delete("/user", userController.delete);
router.put("/user", userController.update);

module.exports = router;