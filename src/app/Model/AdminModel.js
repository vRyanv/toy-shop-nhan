const database = require('../../Database/connect')

class AdminModel{

    //category
    getCateList(){
        return database.query(`select * from category`)
            .then((result) => {
                return result.rows
            })
    }

    newCate(cateName){
        return database.query(`insert into category (cat_name) values ('${cateName}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getCateInfo(cateId){
        return database.query(`select cat_id, cat_name from category where cat_id = ${cateId}`)
            .then((result) => {
                return result.rows
            })
    }

    updateCate(cateId, cateName){
        return database.query(`update category set cat_name = '${cateName}' where cat_id = ${cateId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    isCateUsed(cateId){
        return database.query(`select cat_id from product where cat_id = ${cateId}`)
            .then((result) => {
                return result.rowCount !== 0
            })
    }

    deleteCate(cateId){
        return database.query(`delete from category where cat_id = ${cateId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    //supplier
    newSup(supName){
        return database.query(`insert into supplier (supplier_name) values ('${supName}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getSupList(){
        return database.query(`select * from supplier`)
            .then((result) => {
                return result.rows
            })
    }

    getSupInfo(supId){
        return database.query(`select supplier_id, supplier_name from supplier where supplier_id = ${supId}`)
            .then((result) => {
                return result.rows
            })
    }

    updateSup(supId, supName){
        return database.query(`update supplier set supplier_name = '${supName}' where supplier_id = ${supId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    isSupUsed(supId){
        return database.query(`select supplier_id from product where supplier_id = ${supId}`)
            .then((result) => {
                return result.rowCount !== 0
            })
    }

    deleteSup(supId){
        return database.query(`delete from supplier where supplier_id = ${supId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    //product
    getProList(shopId){
        return database.query(`select p.pro_id,
                                      c.cat_name,
                                      s.supplier_name,
                                      p.pro_name,
                                      p.pro_image,
                                      p.price,
                                      p.quantity
                               from product as p,
                                    category as c,  
                                    supplier as s
                               where c.cat_id = p.cat_id
                                 and p.supplier_id = s.supplier_id
                                 and p.shop_id = ${shopId}`)
            .then((result) => {
                return result.rows
            })
    }
}

module.exports = new AdminModel