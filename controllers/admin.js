const admin = async(req,res, next)=>{

    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user,
            route: 'interfaces/html/admin.html'
        }
    
    }, )
}

module.exports ={
    admin
}