// Models
const { Task } = require("../models/task.model");

//* Task exists :  id
const taskExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const taskData = await Task.findOne({
            where: { id, status: "active" },
        });

        // If user doesn't exist, send error message
        if (!taskData) {
            return res.status(404).json({
                status: "error",
                message: `Task not found .  id: ${id}  and status: "active" `,
            });
        }

        // req.anyPropName = 'anyValue'
        //req.id = id;
        req.taskData = taskData;
        next();
    } catch (error) {
        console.log(error);
    }
};

//* Task Status exists : ["active", "completed", "late", "cancelled"]
const taskStatusExists = (req, res, next) => {
    try {
        // List status
        const arrStatus = ["active", "completed", "late", "cancelled"];

        const { status } = req.params;

        const resultStatus = arrStatus.find((data) => {
            return data === status;
        });

        // If user doesn't exist, send error message
        if (!resultStatus) {
            return res.status(404).json({
                status: "error",
                message: `No exists ${status}`,
            });
        }

        // req.anyPropName = 'anyValue'
        req.status = status;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    taskExists,
    taskStatusExists,
};
