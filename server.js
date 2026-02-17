const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// TEsting of route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected Successfully",
      time: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// SUBMIt wala code
// app.post("/submit", async (req, res) => {
//   const { id, name, department, description } = req.body;

//   try {
//     await pool.query(
//       `INSERT INTO family_members (id, name, department, description, sync_status)
//        VALUES ($1, $2, $3, $4, $5)`,
//       [id, name, department, description, "synced"]
//     );

//     res.json({ message: "Record inserted successfully" });
//   } catch (err) {
//   console.error("FULL ERROR:", err);
//   res.status(500).json({ error: err.message });
// }

// });

app.post("/submit", async (req, res) => {
  const { member_id, family_id, name, age, occupation, mobile_no } = req.body;

  try {
    await pool.query(
      `INSERT INTO family_members 
       (member_id, family_id, name, age, occupation, mobile_no)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [member_id, family_id, name, age, occupation, mobile_no]
    );

    res.json({ message: "Family member inserted successfully" });

  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

console.log("Submit route loaded");
// LISten hmesha last me rehtaa haiii
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

