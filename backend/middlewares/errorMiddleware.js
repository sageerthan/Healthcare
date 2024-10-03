class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || 'Internal Server Error';
    err.statusCode=err.statusCode || 500;

    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(value=>value.message);
        err=new ErrorHandler(message,400);
    }
    if(err.code ===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)}`;
        err=new ErrorHandler(message,400);
    }
    if(err.name ==='JsonWebTokenError'){
        const message='Invalid Json Web Token';
        err=new ErrorHandler(message,400);
    }
    if(err.name ==='TokenExpiredError'){
        const message='Json Web Token Expired';
        err=new ErrorHandler(message,400);
    }
    if(err.name ==='CastError'){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
module.exports={errorMiddleware,ErrorHandler};