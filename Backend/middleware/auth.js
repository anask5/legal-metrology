import jwt from 'jsonwebtoken';

function isAuthorized(req, res, next) {
  try {
    const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = data;
    if (data.role !== "admin" && data.role !== "inspector") {
      return res.status(403).json({
        message: "Access denied. Authorized personnel only.",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
}

export default isAuthorized;