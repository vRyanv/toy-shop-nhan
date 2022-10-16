const seniorModel = require('../Model/SeniorModel')

class SeniorController{

    getDashboard(req, res){
        seniorModel.getShopList().then((result) => {
            res.render('dashboardSenior.ejs',{module: 'shop', shopList: result})
        })
    }

    newShop(req, res){
        let shopName = req.body.shopName
        let address = req.body.address
        console.log(req.body)
        seniorModel.addNewShop(shopName, address).then((result) =>{
            if(result.length !== 0){
                res.send({status:200, notification:'insert shop success'})
            } else {
                res.send({status:400, notification:'insert shop fail'})
            }
        })
    }

    deleteShop(req, res){
        let shopId = req.body.shopId
        const deleting = async () => {
            let isShopUsed = await seniorModel.checkShopIsUse(shopId)
            if(isShopUsed === 0){
               seniorModel.deleteShop(shopId).then((result) => {
                   console.log(result)
                    if(result !== 0){
                        res.send({status:200, notification: 'delete shop success'})
                    } else {
                        res.send({status:400, notification: 'delete shop fail'})
                    }
               })
            } else {
                res.send({status:400, notification: 'Shop is used, can not delete'})
            }
        }
        deleting()
    }
}

module.exports = new SeniorController