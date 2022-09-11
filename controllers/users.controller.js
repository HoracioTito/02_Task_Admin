//* Import Models
const { param } = require("express-validator");
const { User } = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        //* get all users active
        const users = await User.findAll({
            where: { status: "active" },
        });

        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (req, res) => {
    try {
        //* Send name, email and  password
        const { name, email, password } = req.body;

        const newUser = await User.create({ name, email, password });

        // 201 -> Success and a resource has been created
        res.status(201).json({
            status: "success",
            data: { newUser },
        });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res) => {
    try {
        //* Patch : name and email
        const { name, email } = req.body;
        const { id } = req;

        // Method 1: Update by using the model
        // await User.update({ name }, { where: { id } });

        // Method 2: Update using a model's instance
        await User.update({ name, email }, { where: { id } });

        res.status(200).json({
            status: "success",
            data: { id, name, email },
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req;

        // Method : Soft delete
        await User.update({ status: "deleted" }, { where: { id } });

        res.status(204).json({ status: "success" });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
