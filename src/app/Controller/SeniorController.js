const seniorModel = require('../Model/SeniorModel')

class SeniorController{

    getDashboard(req, res){
        res.render('dashboardSenior.ejs',{module: 'shop'})
    }

    newShop(req, res){
        let shopName = req.body.shopName
        let address = req.body.address
        seniorModel.addNewShop(shopName, address).then((result) =>{
            if(result !== 0){
                res.send({status:200, notification:'insert shop success'})
            } else {
                res.send({status:400, notification:'insert shop fail'})
            }
        })
    }
}

module.exports = new SeniorController