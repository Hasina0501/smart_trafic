module.exports = (...roles) => {
    return (req, res, next) => {
        console.log("AUTHORIZE");
        
        if (!req.user) {
            return res.status(401).json({
                error: 'Non authentifié'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Accès refusé'
            });
        }

        next();
    };

};