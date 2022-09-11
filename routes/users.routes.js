//0 - Express
const express = require("express");
// const { body, validationResult } = require('express-validator');

// 1- Controllers Users
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/users.controller");

// 2 - Middlewares : controler if user exists
const { userExists } = require("../middlewares/users.middlewares");

// 3 -  Middlewares validators
const {
    nameValidators,
    emailValidators,
    passwordValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers); // get user active.

usersRouter.post(
    "/",
    nameValidators,
    emailValidators,
    passwordValidators,
    createUser
);

// Control user exists by id
usersRouter.patch(
    "/:id",
    userExists,
    nameValidators,
    emailValidators,
    updateUser
);

usersRouter.delete("/:id", userExists, deleteUser);

module.exports = { usersRouter };
