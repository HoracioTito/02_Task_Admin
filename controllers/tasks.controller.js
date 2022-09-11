//* Import Models
const { param } = require("express-validator");
const { Task } = require("../models/task.model");

// a -Create task - Validators Ok
const createTask = async (req, res) => {
    try {
        //* Send : title, , userId ,startDate and limitDate
        const { title, userId, startDate, limitDate } = req.body;

        const newTask = await Task.create({
            title,
            userId,
            startDate,
            limitDate,
        });

        // 201 -> Success and a resource has been created
        res.status(201).json({
            status: "success",
            data: { newTask },
        });
    } catch (error) {
        console.log(error);
    }
};

// b- Get all task
const getAllTask = async (req, res) => {
    try {
        //* get all users active
        const allTask = await Task.findAll();

        res.status(200).json({
            status: "success",
            data: {
                allTask,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

// c- Get for Status tasks -  Crtl status:exists
const getStatusTask = async (req, res) => {
    try {
        const { status } = req;

        //* get task for status
        const statusTask = await Task.findAll({
            where: { status: status },
        });

        res.status(200).json({
            status: "success",
            data: {
                statusTask,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

// d- Update status task for id - Ctrl id:exists- Date controller
const updateTask = async (req, res) => {
    try {
        //* Patch : Recover data

        const { taskData } = req;
        const { id, limitDate } = taskData; // Desectructure
        const { finishDate } = req.body;

        //* Conversion Date Objet to String ISO - Replace T for  " " => 2022-08-01T05:01:00 TO 2022-08-01 05:01:00
        let strLimiteDate = limitDate.toISOString();
        strLimiteDate = strLimiteDate.replace("T", " ");

        //* Date format YYYY-MM-DD HH:MM:SS TO YYYY/MM/DD HH:MM:SS
        let st = "";
        const limitDateFormat = new Date(strLimiteDate.replace(/-/g, "/"));
        const finishDateFormat = new Date(finishDate.replace(/-/g, "/"));

        if (limitDateFormat >= finishDateFormat) {
            st = "completed";
        } else if (finishDateFormat > limitDateFormat) {
            st = "late";
        }

        //await Task.update({ exitTime, status: st });

        // Method 1: Update by using the model
        // await User.update({ name }, { where: { id } });

        // Method 2: Update using a model's instance
        await Task.update({ finishDate, status: st }, { where: { id: id } });

        res.status(200).json({
            status: "success",
            data: { st },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        //*  Recover data
        const { taskData } = req;
        const { id } = taskData; // Desectructure

        // Method : Soft delete
        await Task.update({ status: "canceled" }, { where: { id } });

        res.status(204).json({
            status: "success",
            data: { status: "canceled" },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createTask,
    getAllTask,
    getStatusTask,
    updateTask,
    deleteTask,
};
