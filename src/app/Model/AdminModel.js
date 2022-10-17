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

}

module.exports = new AdminModel