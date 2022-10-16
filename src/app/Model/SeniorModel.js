const database = require('../../Database/connect')

class SeniorModel{

    addNewShop(shopName, address){
       return database.query(`insert into shop (shop_name, address) values ('${shopName}', '${address}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getShopList(){
        return database.query(`select * from shop`).then((result) => {return result.rows})
    }

    getShopInfo(){

    }

    updateShopInfo(){

    }

    checkShopIsUse(shopId){
        return database.query(`select shop_id from account where shop_id = ${shopId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    deleteShop(shopId){
        return database.query(`delete from shop where shop_id = ${shopId}`).then((result) =>{
            return result.rowCount
        })
    }
}

module.exports = new SeniorModel