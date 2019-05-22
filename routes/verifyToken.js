const jwt = require('jsonwebtoken');
function verify(req, res, next) {
    const token = req.header('auth-token');
    if (!token) { return res.status(401).send({ message: 'access denied' }) };
    try {
        const verified = jwt.verify(token, 'secret key');
        req.user = verified;
    } catch (err) {
        res.status(400).send({ message: 'invalid token' })
    }
}