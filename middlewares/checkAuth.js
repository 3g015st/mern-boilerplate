const jwt = require('jsonwebtoken');

module.exports = (req, res,  next) => {
    const token = req.headers.authorization.split('')[1];
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, 'secret-key');
    }catch(err){
        err.statusCode = 500;
        throw err;
    }

    if(!isDecoded){
        const error = new Error('User is not authenticated');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodeToken.userId;
    next();
}