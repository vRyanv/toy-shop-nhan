const loginModel  = require('../Model/loginModel')
const registerModel=require('../Model/registerModel')
const database = require("../../Database/connect");
class LoginController{
    getLogin(req,res){
        res.render('login.ejs')
    }

    logout(req, res){
        res.cookie('__token', '')
        res.redirect('/')
    }

    checkexist(req, res){
        let user=req.body.username
        let pass=req.body.password
        registerModel.register(user).then((result) =>{
            if(result.rowCount===0){
                registerModel.createaccount(req.body.username,req.body.password,0).then((result) => {
                    if(result!==0){
                        res.send({status:200})
                    }
                })

            }
            else{
                res.send({status:400})
            }
        })
    }
}
module.exports=new LoginController