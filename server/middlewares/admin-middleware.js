const errorMiddleware = require("./error-middleware");

const adminMiddleware = async (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ Message: "Access defined. User is not an admin" });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;