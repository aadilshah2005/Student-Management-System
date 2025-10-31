const Student = require('../models/Student');


const addStudent = async (req, res) => {
    try {

        const {name, email, course, phone, address} = req.body;
        if (!name || !email || !course || !phone || !address) {
            return res.status(400).json({success: false, message: "All Fileds Required"});
        }

        const student = await Student.findOne({email});
        if (student) {
            return res.status(400).json({success: false, massage: "Student All Ready Exist"});
        }

        const studentData = await Student.create({
            name,
            email,
            course,
            phone,
            address
        })
        res.status(201).json({success: true, message: "Student Created", studentData})

    } catch (error) {
        console.log("Student Not Created :", error.message);
        res.status(500).json({success: false, message: error.message})
    }
}


const getAllStudents = async (req, res) => {
    try {
        
        const students = await Student.find({});
        res.status(200).json({success: true, message: students})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }


}

const getStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id)
        if (!student) {
            return res.status(404).json({success: false, message: "Student Not Found"});
        }

        res.status(200).json({success: true, data: student});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message})
    }

}

const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const student = await Student.findByIdAndUpdate(id,
            updateData,
            {new: true}
        );

        if (!student) {
            return res.status(404).json({success: false, message: "Stuent Not Found"});
        }

        res.status(200).json({success: true, message: "Student updated successfully", data: student })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }

}

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteStudent = await Student.findByIdAndDelete(id);
        if (!deleteStudent) {
            return res.status(400).json({success: false, message :"Student Not Found"});
        }
        res.status(200).json({success: true, message: "Student deleted successfully", deleteStudent});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    deleteStudent,
    updateStudent
}
