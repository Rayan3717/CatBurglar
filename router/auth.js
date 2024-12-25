const express = require("express");
const dataModel = require("../models/data")
const router = express.Router();
const { createAccount, deleteAccount, login, logout, add, addPage, loginPage } = require("../controllers/authControllers");

router.get("/", function (req, res) {
    res.render("index");
})
router.get("/login", loginPage);
router.get("/analysis/:ids", async (req, res) => {
    try {
        const { ids } = req.params;
        const idArray = ids.split(","); // Parse the IDs

        // Fetch forms from the database
        const forms = await dataModel.find({ _id: { $in: idArray } });

        if (!forms || forms.length === 0) {
            return res.status(404).send("No forms found for analysis.");
        }
        console.log(forms)
        // Render an HTML view or send JSON for the frontend to display
        res.render("analysis", { forms }); // Example: Send forms as JSON for frontend rendering
    } catch (error) {
        console.error("Error in analysis route:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/register", function(req, res) {
    res.render("register");
})
router.post("/add", add);
router.get("/addPage", addPage);
router.post("/createAccount", createAccount);
router.delete("/deleteAccount", deleteAccount);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;