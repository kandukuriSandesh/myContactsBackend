const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const tokenAuthHandler = asyncHandler(async (req,res,next) => {
    let token;
    console.log(req.headers)
    let authToken = req.headers.Authorization || req.headers.authorization;
    console.log(authToken);
    console.log(authToken.startsWith('Bearer'));
    if(authToken.startsWith('Bearer')){
           token = req.headers.authorization.split(" ")[1]
           console.log(token)
           jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded) => {
            console.log(decoded)
                req.user = decoded.user
           })
           next()
    }else{
        res.status(400)
        throw new Error('Invalid Token')
    }
})

module.exports = tokenAuthHandler