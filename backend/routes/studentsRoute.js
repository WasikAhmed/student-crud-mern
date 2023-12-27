const Student = require("../models/studentModel");

const express = require("express");
const router = express.Router();

// Route for get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for get one student by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const student = await Student.findById(id);

        return res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for create a new student
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.name || 
            !req.body.department || 
            !req.body.cgpa
        ) {
            return res.status(400).send({
                message: "Send all required fields: name, department, cgpa"
            })
        }
        const newStudent = new Student({
            name: req.body.name,
            department: req.body.department,
            cgpa: req.body.cgpa
        });
        const student = await Student.create(newStudent);

        return res.status(201).json({ message: "Student created successfully", student});

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});

// Route for update a student
router.put("/:id", async (req, res) => {
    try {
        if(
            !req.body.name || 
            !req.body.department || 
            !req.body.cgpa
        ) {
            return res.status(400).send({
                message: "Send all required fields: name, department, cgpa"
            })
        }

        const { id } = req.params
        const result = await Student.findByIdAndUpdate(id, req.body)

        if(!result) {
            return res.status(404).send({ message: "Student not found"});
        }

        return res.status(200).send({ message: "Student updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for delete a student
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Student.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({ message: "Student not found"});
        }
        return res.status(200).send({ message: "Student deleted successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;