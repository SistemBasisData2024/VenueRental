const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const register = async (req, res) => {
  const { name, email, password, phone_number, role } = req.body;
  //const hashedPassword = await bcrypt.hash();

  try {
    const result = await db.query(
      "INSERT INTO users VALUES (default, $1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, phone_number, role]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return res.status(200).json({ message: "Password is valid" });
    }
    const payload = {
      user: {
        id: user.user_id,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getAllUsers };
