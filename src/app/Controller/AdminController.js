const adminModel = require('../Model/AdminModel')

class AdminController{

    //category
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

    //supplier
    getSupList(req, res){
        adminModel.getSupList().then((result) => {
            res.render('dashboardSenior.ejs', {module: 'supplier', supList:result,role: req.role})
        })
    }

    newSup(req, res){
        adminModel.newSup(req.body.supName).then((result) => {
            if(result !== 0){
                res.send({status:200, notification: 'add supplier success'})
            } else {
                res.send({status:400, notification: 'add supplier fail'})
            }
        })
    }

    getSupInfo(req, res){
        adminModel.getSupInfo(req.params.id).then((result) => {
            if(result.length !== 0){
                res.send({status:200, supplier: result[0]})
            } else {
                res.send({status:400, notification: 'Not found supplier'})
            }
        })
    }

    updateSup(req, res){
        let supId = req.body.supId
        let supName = req.body.supName
        adminModel.updateSup(supId, supName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, notification: 'update supplier success'})
            } else {
                res.send({status:400, notification: 'update supplier fail'})
            }
        })
    }

    deleteSup(req, res){
        let supId = req.body.supId
        const handleDeleteSup = async () => {
            let isSupUsed = await adminModel.isSupUsed(supId)
            if(isSupUsed){
                res.send({status:400, notification: 'This supplier is used'})
            } else {
                adminModel.deleteSup(supId).then((result) => {
                    if(result !== 0){
                        res.send({status:200, notification: 'delete supplier success'})
                    } else {
                        res.send({status:400, notification: 'delete supplier fail'})
                    }
                })
            }
        }
        handleDeleteSup()
    }


    //product
    getProList(req, res){
        const handleGetProList = async () => {
            let proList = await adminModel.getProList(req.shopId)
            let cateList = await adminModel.getCateList()
            let supList = await adminModel.getSupList()
            res.render('dashboardSenior.ejs', {module: 'product', proList, cateList, supList, role: req.role})
        }

        handleGetProList()
    }

    newPro(req, res){
        if(req.hasImage){
            let product = {
                cateId: req.body.cateId,
                supId: req.body.supId,
                shopId: req.shopId,
                proName: req.body.proName,
                proPrice: req.body.price,
                quantity: req.body.quantity,
                proImage: req.file.filename,
            }
            adminModel.newPro(product).then((result)  => {
                if(result.rowCount !== 0){
                    res.send({status:200, notification:'add product success'})
                } else {
                    res.send({status:400, notification:'add product fail'})
                }
            })
        } else {
            res.send({status: 400, notification: 'Invalid image'})
        }
    }
}

module.exports =  new AdminController