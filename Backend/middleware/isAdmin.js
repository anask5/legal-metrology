import jwt from 'jsonwebtoken';
function isAdmin(req, res, next) {
    try {
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        req.user = data;
        if(data.role !== "admin"){
           return res.status(403).json({
            message: "Access denied. Admin only.",
        });
        }
        console.log(data)
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

export default isAdmin;