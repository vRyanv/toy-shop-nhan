class homeController{
    getHome(req,res){
        res.send('home')
    }
    notFound(req, res){
        res.render('notFound.ejs')
    }

}
module.exports=new homeController