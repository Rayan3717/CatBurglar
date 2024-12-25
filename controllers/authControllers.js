const userModel = require("../models/user");
const dataModel = require("../models/data");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token");
const jwt = require("jsonwebtoken");

module.exports.createAccount = async function (req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await userModel.create({
            name,
            email,
            password: hash
        })
        const token = await generateToken(email);
        res.cookie("token", token);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteAccount = async function (req, res) {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const email = await jwt.verify(token, process.env.JWT_SECRET);
        if (!email) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const deletedUser = await userModel.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ message: "User  not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.loginPage = async function (req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.render("login");
        }
        const email = jwt.verify(token, process.env.JWT_SECRET);
        if (!email) {
            return res.render("login");
        }
        const user = await userModel.findOne({ email }).populate("datas");
        if (!user) {
            return res.render("login");
        }
        res.render("main", { user });
    } catch (error) {
        console.log(error);
        res.render("login");
    }
};

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).populate("datas");
        if (!user) {
            console.log("Redirecting with error: User not found");
            return res.redirect('/login?error=' + encodeURIComponent('User not found'));
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            console.log("Redirecting with error: Invalid password");
            return res.redirect('/login?error=' + encodeURIComponent('Invalid password'));
        }
        user.password = undefined; // Hide password for security
        const token = await generateToken(email);
        res.cookie("token", token);
        res.render("main", { user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports.logout = function (req, res) {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports.addPage = async function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).addsend("Unauthorized Access");
    }
    const email = await jwt.verify(token, process.env.JWT_SECRET);
    if (!email) {
        return res.status(401).addsend("Unauthorized Access");
    }
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).addsend("Unauthorized Access");
    }
    res.render("add", { user });
}

module.exports.add = async function (req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }

        const email = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }
        const forms = req.body; // Forms sent from the frontend
        if (!forms || Object.keys(forms).length === 0) {
            return res.status(400).json({ error: "No forms provided" });
        }
        console.log("Received forms:", forms);

        // Save each form to the database
        const formIds = [];
        for (const key in forms) {
            const form = forms[key];
            console.log("FOOOORRMMMMM:", form)
            // Normalize keys (remove trailing underscores)
            const paymentMode = form.paymentMode;
            let income = parseFloat(form.income) || 0;  // Convert income to a number
            let expense = parseFloat(form.expense) || 0;  // Convert expense to a number

            // Check for missing data
            if (!paymentMode || isNaN(income) || isNaN(expense)) {
                console.warn(`Incomplete form data for key ${key}:`, form);
                continue; // Skip invalid form
            }

            const data = new dataModel({
                type: paymentMode,
                expense: expense,
                income: income,
                owner: user._id,
            });

            console.log("Parsed and normalized data:", data); // Log normalized data
            const savedData = await data.save();
            formIds.push(savedData._id); // Collect saved document IDs
        }

        console.log("Form IDs to redirect:", formIds); // Debugging log
        if (formIds.length > 0) {
            // Redirect to analysis route with form IDs
            res.redirect(`/analysis/${formIds.join(",")}`);
        } else {
            console.warn("No valid form data was saved.");
            res.status(400).json({ error: "No valid form data" });
        }
    } catch (error) {
        console.error("Error in /add route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


