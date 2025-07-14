const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at lest of 3 chars." })
        .max(255, { message: "Email must not be more than 255 characters" }),

    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(3, { message: "password must be at lest of 6 chars." })
        .max(255, { message: "password must not be more than 255 characters" }),
})

const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at lest of 3 chars." })
        .max(255, { message: "Name must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(3, { message: "phone must be at lest of 10 chars." })
        .max(255, { message: "Name must not be more than 20 characters" }),

    gender: z
        .enum(["male", "female", "other"], {
            required_error: "Gender is required",
            invalid_type_error: "Gender must be one of male, female, or other",
        }),

    dob: z
        .string({ required_error: "Date of birth is required" })
        .refine((date) => {
            return !isNaN(Date.parse(date));
        }, {
            message: "Invalid date format. Use YYYY-MM-DD",
        }),
});



module.exports = {signupSchema, loginSchema};