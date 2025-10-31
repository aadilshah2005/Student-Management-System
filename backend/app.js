const express = require('express');
require('dotenv').config();
const cors = require("cors");
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://student-management-system-1-j40f.onrender.com" // 👈 yahan apna Render frontend URL daal
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


connectDB();
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/student', studentRoutes);

app.get('/', (req, res) => {
    res.send("Student Management System");
});

app.listen(PORT, () => {
    console.log("Server is Runing At PORT: ", PORT);

})
