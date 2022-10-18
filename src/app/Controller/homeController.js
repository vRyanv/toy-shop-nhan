const adminModel = require('../Model/AdminModel')

class homeController{
    getHome(req,res){
        adminModel.getProForCust().then((result) => {
            res.render('home.ejs',{proList: result})
        })

    }
    notFound(req, res){
        res.render('notFound.ejs')
    }

    custSearchPro(req, res){
        let proName = req.params.name
        adminModel.searchProForCust(proName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, proList: result})
            } else {
                res.send({status:200, notification: "Not found product"})
            }
        })
    }

}
module.exports=new homeController