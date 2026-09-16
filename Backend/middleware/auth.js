import jwt from 'jsonwebtoken';
function auth(req, res, next) {
    try {
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

export default auth;