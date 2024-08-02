import jwt from 'jsonwebtoken'
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Auth Error' });
        }
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded.user;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: 'Invalid Token' });
        }
    };
};

export default authMiddleware;