const adminModel = require('../Model/AdminModel')

class AdminController{
    getDashBoard(req, res){
        res.render('dashboardSenior.ejs', {module: 'product',role: req.role})
    }

    getCateList(req, res){
        adminModel.getCateList().then((result) => {
            res.render('dashboardSenior.ejs', {module: 'category', cateList:result,role: req.role})
        })
    }

    newCate(req, res){
        adminModel.newCate(req.body.cateName).then((result) => {
            if(result !== 0){
                res.send({status:200, notification: 'add category success'})
            } else {
                res.send({status:400, notification: 'add category fail'})
            }
        })
    }

    getInfoCate(req, res){
        adminModel.getCateInfo(req.params.id).then((result) => {
            if(result.length !== 0){
                res.send({status:200, category: result[0]})
            } else {
                res.send({status:400, notification: 'Not found category'})
            }
        })
    }

    updateCate(req, res){
        let cateId = req.body.cateId
        let cateName = req.body.cateName
        adminModel.updateCate(cateId, cateName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, notification: 'update category success'})
            } else {
                res.send({status:400, notification: 'update category fail'})
            }
        })
    }

    deleteCate(req, res){
        let cateId = req.body.cateId

        const handleDeleteCate = async () => {
            let isCateUsed = await adminModel.isCateUsed(cateId)
            if(isCateUsed){
                res.send({status:400, notification: 'This category is used'})
            } else {
                adminModel.deleteCate(cateId).then((result) => {
                    if(result !== 0){
                        res.send({status:200, notification: 'delete category success'})
                    } else {
                        res.send({status:400, notification: 'delete category fail'})
                    }
                })
            }
        }
        handleDeleteCate()
    }
}

module.exports =  new AdminController