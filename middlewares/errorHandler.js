const { errorCodes } = require("../constants");

const errorHandler = (err,req,res,next) => {
    switch (res.status) {
        case errorCodes.VALIDATION_ERROR:
            res.json({
                title:'Validation Failed',
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        case errorCodes.NOT_FOUND:
                res.json({
                    title:'NOT Found',
                    message:err.message,
                    stackTrace:err.stack,
                })
            break;
        case errorCodes.UNAUTHORIZED:
                    res.json({
                        title:'Un Authorized',
                        message:err.message,
                        stackTrace:err.stack,
                    })
            break;
        case errorCodes.FORBIDDEN:
            res.json({
                title:'Forbidden',
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        case errorCodes.SERVER_ERROR:
                res.json({
                    title:'Server Error',
                    message:err.message,
                    stackTrace:err.stack,
                })
            break;
        
    
        default:
            res.json({
                message:"No Error"
    })

            break;
    }

}

module.exports = {errorHandler}