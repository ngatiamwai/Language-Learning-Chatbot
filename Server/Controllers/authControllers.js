const mssql = require('mssql')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const { registerSchema, loginSchema } = require('../Validators/validators')
const { sqlConfig } = require('../Config/Config')

dotenv.config()

const registerUser = async (req, res) => {
    try {
        const userId = v4();
        console.log("Request body:", req.body);

        const { firstName, lastName, userName, email, password, phoneNumber } = req.body;
        if (!firstName || !lastName || !userName || !email || !password || !phoneNumber) {
            console.log("Missing required fields in the request body");
            return res.status(400).json({
                error: 'Please input all values'
            });
        }

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(422).json(error.details);
        }

        const pool = await mssql.connect(sqlConfig)
            .catch((error) => {
                console.error("Database connection failed:", error);
                return res.status(500).json({ error: "Database connection failed" });
            });

        const hashedPwd = await bcrypt.hash(password, 5);

        const result = await pool
            .request()
            .input("userId", mssql.VarChar, userId)
            .input("firstName", mssql.VarChar, firstName)
            .input("lastName", mssql.VarChar, lastName)
            .input("userName", mssql.VarChar, userName)
            .input("email", mssql.VarChar, email)
            .input("phoneNumber", mssql.NVarChar, phoneNumber)
            .input("password", mssql.VarChar, hashedPwd)
            .execute("registerUserProc");

        console.log(result);

        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({ message: 'User registered successfully' });
        } else {
            return res.status(400).json({ message: 'User registration failed' });
        }
    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).json({ error: "Registration failed" });
    }
};

const userLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const { error } = loginSchema.validate(req.body);
        if (!email || !password) {
            return res.status(400).json({
                error: "Please input all values"
            });
        }
        if (error) {
            return res.status(422).json(error.details);
        }

        const pool = await mssql.connect(sqlConfig);
        const user = (
            await pool
            .request()
            .input("email", mssql.VarChar, email)
            .execute("loginUserProc")
        ).recordset[0];

        console.log("User: ", user);

        if (!user) {
            return res.status(404).json({ message: "Email does not exist in the system. Please use a valid email address" });
        }

        const comparePwd = await bcrypt.compare(password, user.password);

        if (!comparePwd) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const { id, role, ...payload } = user;
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "36000s" });
        let message = "Logged in";

        if (user.role === "admin") {
            message = "Admin logged in";
        }

        return res.status(200).json({ id, role, message, token });
    } catch (error) {
        if (error.message.includes("duplicate key value")) {
            return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    registerUser,
    userLogin
};
