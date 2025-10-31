const express = require("express");
 const verifyToken = require('../middlewares/authMiddleware');
const {
  addStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent
} = require("../controllers/studentController");

const routes = express.Router();

routes.post("/", verifyToken, addStudent);
routes.get("/",verifyToken,  getAllStudents);
routes.get("/:id", verifyToken,  getStudentById);
routes.delete("/:id", verifyToken,  deleteStudent );
routes.put("/:id", verifyToken,  updateStudent );

module.exports = routes;
