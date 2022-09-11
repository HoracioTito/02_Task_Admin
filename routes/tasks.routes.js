// 0- Express
const express = require("express");

// 1-  Controller tasks
const {
    createTask,
    getAllTask,
    getStatusTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks.controller");

// 2- Middlewares
const {
    taskExists,
    taskStatusExists,
    tasKLimitDate,
} = require("../middlewares/tasks.middleware");

// 3- Middlewares Validators
const {
    createTaskValidator,
    taskFinishDateValidator,
} = require("../middlewares/validators.middlewares");

// 4 - Ruoters

const tasksRouter = express.Router();

// a -Create task - ValidatorCreate
tasksRouter.post("/", createTaskValidator, createTask);

// b- Get all task
tasksRouter.get("/", getAllTask);

// c- Get for Status tasks -  Crtl status:exists
tasksRouter.get("/:status", taskStatusExists, getStatusTask);

// d- Update status task for id - Ctrl id:exists
tasksRouter.patch("/:id", taskExists, taskFinishDateValidator, updateTask); //

// e- Delete ( soft delete ) for id - Ctrl id:exists
tasksRouter.delete("/:id", taskExists, deleteTask);

module.exports = { tasksRouter };
