const database = require('../../Database/connect')

class SeniorModel{

    addNewShop(shopName, address){
        database.query(`insert into shop (shop_name, address) values ('${shopName}', '${address}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getShopInfo(){

    }

    updateShopInfo(){

    }

    deleteShop(){

    }
}

module.exports = new SeniorModel