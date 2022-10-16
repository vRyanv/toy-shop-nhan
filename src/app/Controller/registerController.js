const registerModel=require("../Model/registerModel")
const database=require("../../Database/connect")
class registerController{
    register(req,res){
        res.render("register.ejs")
    }
}
module.exports=new registerController()