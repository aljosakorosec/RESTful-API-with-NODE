exports.error=(req,res,next)=>{
    const error=new Error("the page you are looking for can not be found")
    error.status=404
    error.name="Unexisting page"
    next(error)
}
exports.error2=(error,req,res,next)=>{
    res.status(error.status || 500).json({
        message:error.message,
        status:error.status,
        TypeOfError:error.name
    })
}