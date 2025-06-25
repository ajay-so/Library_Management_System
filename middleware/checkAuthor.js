const checkAuthor = (req, res, next) => {
    const { role } = req.user; // Assuming the user's role is stored in req.user.role

    if (role !== "author") {
        return res.status(403).json({ message: "Access denied. Only authors can perform this action." });
    }

    next(); 
};

module.exports = checkAuthor;