const jwt = require('jsonwebtoken');
module.exports.authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth) {
        return res.status(401).json({
            error: 'Token manquant'
        });
    }
    const token = auth.split(' ')[1];
    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log(payload);
        req.user = payload;

        next();
    }
    catch(error) {
        console.log(error);
        return res.status(401).json({
            error: 'Token invalide'
        });
    }
};