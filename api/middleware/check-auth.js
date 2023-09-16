const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        //console.log(token);
        const decoded = jwt.decode(token, process.env.JWT_KEY);
        console.log(decoded);
        req.userData = decoded;
        next();
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message: error
        });
    }
};