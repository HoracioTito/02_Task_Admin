//* Info validator
const { body, validationResult } = require("express-validator");

//* Control Validation
const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg);
        // Message
        const message = errorMessages.join(". ");

        return res.status(400).json({
            status: "error",
            message,
        });
    }

    next();
};

//* Validator : name
const nameValidators = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
    checkValidations,
];

//* Validator : email
const emailValidators = [
    body("email").isEmail().withMessage("Must provide a valid email"),
    checkValidations,
];

//* Validators :  password
const passwordValidators = [
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    checkValidations,
];

//* Validator task : title
const createTaskValidator = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ min: 4 })
        .withMessage("Title must be at ñeast 4 character"),
    body("userId").isNumeric({ min: 1 }).withMessage("userId must be number"),
    body("startDate")
        .isString()
        .withMessage("Start Date must be a string")
        .notEmpty()
        .withMessage("Start Date cannot empty")
        .isLength({ min: 19, max: 19 }),
    body("limitDate")
        .isString()
        .withMessage("Start Date must be a string")
        .notEmpty()
        .withMessage("Start Date cannot empty")
        .isLength({ min: 19, max: 19 }),
    checkValidations,
];

const taskFinishDateValidator = [
    body("finishDate")
        .isString()
        .withMessage("Start Date must be a string")
        .notEmpty()
        .withMessage("Start Date cannot empty")
        .isLength({ min: 19, max: 19 }),
    checkValidations,
];

module.exports = {
    nameValidators,
    emailValidators,
    passwordValidators,
    createTaskValidator,
    taskFinishDateValidator,
};
