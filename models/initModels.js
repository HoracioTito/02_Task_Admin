// Models
const { User } = require("./user.model");
const { Task } = require("./task.model");

// Tables relations
const initModels = () => {
    // 1 User <----> M Task
    User.hasMany(Task, { foreignKey: "userId" });
    Task.belongsTo(User);
};

module.exports = { initModels };
