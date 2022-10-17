const seniorModel = require('../Model/SeniorModel')

class SeniorController{

    //shop
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

    getInfoShop(req, res){
        let shopId = req.params.id
        seniorModel.getShopInfo(shopId).then((result) => {
            if(result.length !== 0){
                res.send({status:200, shop:result})
            } else {
                res.send({status:400, notification:'Not found shop'})
            }
        })
    }

    updateShop(req, res){
        let shopId = req.body.shopId
        let shopName = req.body.shopName
        let address = req.body.address

        seniorModel.updateShopInfo(shopId, shopName, address).then((result) =>{
            if(result !== 0){
                res.send({status:200, notification: 'update shop success'})
            } else {
                res.send({status:400, notification: 'update shop fail'})
            }
        })
    }

    //staff
    staffList(req, res){
        const handleGetStaff = async () => {
            let staffList = await seniorModel.getStaffList()
            let shopList = await seniorModel.getShopList()
            res.render('dashboardSenior.ejs', {module: 'staff', staffList, shopList})
        }
        handleGetStaff()
    }

    getStaffInfo(req, res){
        let staffId = req.params.id
        seniorModel.getStaffInfo(staffId).then((result) => {
            if(result.length !== 0){
                res.send({status:200, staff:result[0]})
            } else {
                res.send({status:400, notification: 'Not found staff'})
            }
        })
    }

    newStaff(req, res){
        let staff = req.body.staff
        const handleNewStaff = async () => {
            let isExisted = await seniorModel.isUsernameExisted(staff.username)
            if(isExisted){
                res.send({status:400, notification: 'username is existed'})
            } else {
                let result = await seniorModel.newStaff(staff)
                if(result !== 0){
                    res.send({status:200, notification: 'add staff success'})
                } else {
                    res.send({status:400, notification: 'add staff fail'})
                }
            }
        }
        handleNewStaff()

    }

    updateStaff(req, res){
        let shopId = req.body.staff.shopId
        let accountId = req.userId
        seniorModel.updateStaff(accountId, shopId).then((result) => {
            if(result !== 0){
                res.send({status:200, notification: 'update staff success'})
            } else {
                res.send({status:200, notification: 'update staff fail'})
            }
        })
    }
}

module.exports = new SeniorController